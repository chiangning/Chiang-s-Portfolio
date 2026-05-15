import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, Sparkles, Send, Bot, User } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Task, ProjectMetadata } from '../types';
import { startOfDay, addDays } from 'date-fns';
import { cn } from '../lib/utils';

interface AISchedulerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (tasks: Task[]) => void;
  currentTasks?: Task[];
  chatHistory: { role: 'user' | 'model', text: string }[];
  setChatHistory: React.Dispatch<React.SetStateAction<{ role: 'user' | 'model', text: string }[]>>;
  onUpdateMetadata?: (metadata: Partial<ProjectMetadata>) => void;
}

export const AISchedulerDialog: React.FC<AISchedulerDialogProps> = ({ 
    isOpen,
    onClose, 
    onGenerate, 
    currentTasks = [], 
    chatHistory, 
    setChatHistory,
    onUpdateMetadata
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!prompt.trim()) return;
    
    const userMessage = prompt;
    setPrompt('');
    setLoading(true);
    setError(null);

    // Add user message to history
    const newHistory = [...chatHistory, { role: 'user' as const, text: userMessage }];
    setChatHistory(newHistory);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API Key is not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        You are an expert construction project scheduler based in Australia.
        You can generate new schedules or modify existing ones based on the user's request.
        
        Current Schedule Context:
        ${JSON.stringify(currentTasks.map(t => ({ id: t.id, name: t.name, duration: t.duration, type: t.type, dependencies: t.dependencies, parentId: t.parentId })))}

        Rules:
        1. Use Australian terminology and standard construction phases.
        2. Account for standard working days (Mon-Fri).
        3. If the user asks to generate or update the schedule, return a JSON object wrapped in a markdown code block like \`\`\`json ... \`\`\`.
        4. The JSON object must have the following structure:
           {
             "projectName": "Suggested Project Name",
             "tasks": [ ... array of task objects ... ]
           }
        5. If the user just asks a question, provide a text answer.
        6. Each task object in the "tasks" array must have:
           - id: string (sequential number starting from 1)
           - name: string
           - duration: number (in days)
           - type: "Task" | "Phase" | "Milestone"
           - parentId: string (optional, for hierarchy)
           - dependencies: array of objects { predecessorId: string, type: "FS", lag: number }
           - notes: string (optional, brief description or constraints)
        7. Ensure the schedule is logically sequenced with proper dependencies.
        8. Do not include dates in the JSON, they will be calculated by the engine.
      `;

      // Construct conversation history for the model
      const contents = newHistory.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
        }
      });

      const responseText = response.text || '';
      
      // Check for JSON code block
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```([\s\S]*?)```/);
      
      let aiResponseText = responseText;
      let updatedTasks: Task[] | null = null;
      let updatedProjectName: string | null = null;

      if (jsonMatch) {
          try {
              const jsonStr = jsonMatch[1].trim();
              const parsedData = JSON.parse(jsonStr);
              
              let tasksArray = [];
              
              // Handle both new object format and legacy array format
              if (Array.isArray(parsedData)) {
                  tasksArray = parsedData;
              } else if (parsedData.tasks && Array.isArray(parsedData.tasks)) {
                  tasksArray = parsedData.tasks;
                  if (parsedData.projectName) {
                      updatedProjectName = parsedData.projectName;
                  }
              }

              if (tasksArray.length > 0) {
                  // Post-process to ensure valid structure and dates
                  const today = startOfDay(new Date());
                  updatedTasks = tasksArray.map((t: any) => ({
                    ...t,
                    id: String(t.id),
                    wbs: String(t.id),
                    startDate: today, // Placeholder, will be recalculated
                    endDate: addDays(today, t.duration || 1), // Placeholder
                    progress: 0,
                    isExpanded: true,
                    dependencies: t.dependencies || [],
                    type: t.type || 'Task'
                  }));
                  
                  // Remove the JSON block from the text shown to user to keep it clean
                  aiResponseText = responseText.replace(/```json[\s\S]*?```/g, '').replace(/```[\s\S]*?```/g, '').trim();
                  if (!aiResponseText) aiResponseText = "Schedule updated successfully.";
              }
          } catch (e) {
              console.error("Failed to parse JSON from AI response", e);
              // Fallback: just show the text
          }
      }

      setChatHistory(prev => [...prev, { role: 'model', text: aiResponseText }]);

      if (updatedTasks) {
          onGenerate(updatedTasks);
          if (updatedProjectName && onUpdateMetadata) {
              onUpdateMetadata({ name: updatedProjectName });
          }
          // We do NOT close the dialog here if we want to continue chatting, 
          // BUT the user explicitly asked: "after the generation is complete the window should be closed."
          // AND "the chat window should be available for us to open up again and continue chatting".
          // This implies closing it but preserving state.
          onClose(); 
      }

    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setError(err.message || "Failed to generate response. Please try again.");
      setChatHistory(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="bg-surface rounded-xl shadow-2xl shadow-black/50 w-[600px] h-[600px] flex flex-col border border-white/10 overflow-hidden pointer-events-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-surface-variant">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white">AI Schedule Assistant</h3>
                    <p className="text-[10px] text-white/70">Powered by Gemini • Australian Context</p>
                </div>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
            {chatHistory.length === 0 && (
                <div className="text-center text-white/70 mt-20">
                    <Sparkles size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm">Describe your project to generate a schedule.</p>
                    <p className="text-xs mt-2">"Build a 2-storey house in Sydney..."</p>
                </div>
            )}
            
            {chatHistory.map((msg, idx) => (
                <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    {msg.role === 'model' && (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                            <Bot size={16} />
                        </div>
                    )}
                    <div className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                        msg.role === 'user' 
                            ? "bg-primary text-white rounded-tr-none" 
                            : "bg-secondary/30 text-white rounded-tl-none"
                    )}>
                        {msg.text}
                    </div>
                    {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-primary flex-shrink-0">
                            <User size={16} />
                        </div>
                    )}
                </div>
            ))}
            
            {loading && (
                <div className="flex gap-3 justify-start">
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <Bot size={16} />
                    </div>
                    <div className="bg-secondary/30 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-white/70" />
                        <span className="text-xs text-white/70">Thinking...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-transparent">
            {error && (
                <div className="mb-2 text-xs text-red-500 px-2">
                    {error}
                </div>
            )}
            <div className="flex gap-2">
                <input 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    className="flex-1 bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    placeholder="Type your request..."
                    disabled={loading}
                    autoFocus
                />
                <button 
                    onClick={handleSend} 
                    disabled={!prompt.trim() || loading}
                    className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-sm transition-all disabled:opacity-50 disabled:scale-95"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
