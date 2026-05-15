"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Task, ProjectSettings, Dependency, ProjectMetadata, TradeCost } from './types';
import { calculateCPM } from './lib/cpm';
import { GridPane } from './components/gantt/GridPane';
import { TimelinePane } from './components/gantt/TimelinePane';
import { AISchedulerDialog } from './components/AISchedulerDialog';
import { ProjectOverview } from './components/tabs/ProjectOverview';
import { Cashflow } from './components/tabs/Cashflow';
import { Settings, Plus, ZoomIn, ZoomOut, HardHat, Trash2, Indent, Outdent, Calendar as CalendarIcon, Download, FileText, User as UserIcon, CalendarDays, ArrowUp, ArrowDown, Undo, Redo, Sparkles, Cloud, DownloadCloud, LogOut, LogIn, LayoutDashboard, DollarSign, TrendingUp, CalendarClock } from 'lucide-react';
import { addDays, startOfWeek, endOfWeek, format, differenceInDays, startOfDay } from 'date-fns';
import { cn } from './lib/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


// --- INITIAL DATA ---
const initialTasks: Task[] = [
  { 
    id: '1', wbs: '1', name: 'Project Initiation', duration: 5, startDate: new Date(), endDate: new Date(), 
    dependencies: [], progress: 100, type: 'Phase', isExpanded: true 
  },
  { 
    id: '2', wbs: '2', name: 'Site Survey', duration: 3, startDate: new Date(), endDate: new Date(), 
    dependencies: [], progress: 100, type: 'Task', parentId: '1' 
  },
  { 
    id: '3', wbs: '3', name: 'Soil Testing', duration: 2, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '2', type: 'FS', lag: 0 }], progress: 50, type: 'Task', parentId: '1' 
  },
  { 
    id: '4', wbs: '4', name: 'Foundation', duration: 10, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '3', type: 'FS', lag: 0 }], progress: 0, type: 'Phase', isExpanded: true 
  },
  { 
    id: '5', wbs: '5', name: 'Excavation', duration: 5, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '3', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '4' 
  },
  { 
    id: '6', wbs: '6', name: 'Pour Concrete', duration: 3, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '5', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '4' 
  },
  { 
    id: '7', wbs: '7', name: 'Curing', duration: 7, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '6', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '4' 
  },
  { 
    id: '8', wbs: '8', name: 'Structure', duration: 15, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '7', type: 'FS', lag: 0 }], progress: 0, type: 'Phase', isExpanded: true 
  },
  { 
    id: '9', wbs: '9', name: 'Steel Framing', duration: 10, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '7', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '8' 
  },
  { 
    id: '10', wbs: '10', name: 'Roofing', duration: 5, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '9', type: 'FS', lag: -2 }], progress: 0, type: 'Task', parentId: '8' 
  },
  { 
    id: '11', wbs: '11', name: 'Finishes', duration: 20, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '10', type: 'FS', lag: 0 }], progress: 0, type: 'Phase', isExpanded: true 
  },
  { 
    id: '12', wbs: '12', name: 'Plumbing Rough-in', duration: 5, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '9', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '11' 
  },
  { 
    id: '13', wbs: '13', name: 'Electrical Rough-in', duration: 5, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '9', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '11' 
  },
  { 
    id: '14', wbs: '14', name: 'Drywall', duration: 7, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '12', type: 'FS', lag: 0 }, { predecessorId: '13', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '11' 
  },
  { 
    id: '15', wbs: '15', name: 'Painting', duration: 5, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '14', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '11' 
  },
  { 
    id: '16', wbs: '16', name: 'Flooring', duration: 4, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '15', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '11' 
  },
  { 
    id: '17', wbs: '17', name: 'Final Inspection', duration: 2, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '16', type: 'FS', lag: 0 }], progress: 0, type: 'Task', parentId: '11' 
  },
  { 
    id: '18', wbs: '18', name: 'Project Handover', duration: 0, startDate: new Date(), endDate: new Date(), 
    dependencies: [{ predecessorId: '17', type: 'FS', lag: 0 }], progress: 0, type: 'Milestone' 
  },
];

export default function GanttChartTool() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  // History State
  const [history, setHistory] = useState<Task[][]>([initialTasks]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  const [settings, setSettings] = useState<ProjectSettings>({
    startDate: new Date(),
    showCriticalPath: true,
    showDependencies: true,
    viewMode: 'Week',
    calendarMode: 'Standard',
    isWorkingDays: false
  });
  const [metadata, setMetadata] = useState<ProjectMetadata>({
    name: 'Coastal House',
    number: 'PRJ-2024-001',
    author: 'John Doe',
    description: 'A beautiful 2-storey residential build by the coast.',
    address: '123 Ocean Drive, Coastal City',
    floorArea: 250,
    updatedAt: new Date()
  });

  const [trades, setTrades] = useState<TradeCost[]>([
    { id: '1', tradeName: 'Preliminary', projectedCost: 15000, actualCost: 14500 },
    { id: '2', tradeName: 'Earthwork', projectedCost: 25000, actualCost: 26000 },
    { id: '3', tradeName: 'Foundation', projectedCost: 45000, actualCost: 45000 },
    { id: '4', tradeName: 'Structural Work', projectedCost: 85000, actualCost: 0 },
    { id: '5', tradeName: 'Framing', projectedCost: 65000, actualCost: 0 },
    { id: '6', tradeName: 'Roofing', projectedCost: 35000, actualCost: 0 },
    { id: '7', tradeName: 'Plastering', projectedCost: 20000, actualCost: 0 },
    { id: '8', tradeName: 'Joinery', projectedCost: 40000, actualCost: 0 },
    { id: '9', tradeName: 'External Cladding', projectedCost: 30000, actualCost: 0 },
  ]);

  const [activeTab, setActiveTab] = useState<'scheduler' | 'overview' | 'cost' | 'cashflow'>('scheduler');

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [leftPaneWidth, setLeftPaneWidth] = useState(600);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const exportRef = useRef<HTMLDivElement>(null);

  // History Helper
  const updateTasksWithHistory = (newTasks: Task[]) => {
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push(newTasks);
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
    setTasks(newTasks);
    setMetadata(prev => ({ ...prev, updatedAt: new Date() }));
  };

  const handleReorder = (newTasks: Task[]) => {
    updateTasksWithHistory(newTasks);
  };

  const handleAIGenerated = (newTasks: Task[]) => {
    updateTasksWithHistory(newTasks);
    setIsAIModalOpen(false);
  };

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      setTasks(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      setTasks(history[newIndex]);
    }
  };

  // Recalculate CPM whenever tasks change
  const scheduledTasks = useMemo(() => {
    return calculateCPM(tasks, settings.startDate, settings.calendarMode, settings.isWorkingDays);
  }, [tasks, settings.startDate, settings.calendarMode, settings.isWorkingDays]);

  // Helper to find all connected tasks (predecessors and successors) for highlighting
  const highlightedDependencyChain = useMemo(() => {
    if (!hoveredTaskId) return new Set<string>();
    
    const connected = new Set<string>();
    const visited = new Set<string>();
    
    // Traverse Up (Predecessors)
    const traverseUp = (id: string) => {
      if (visited.has(id)) return;
      visited.add(id);
      connected.add(id);
      const task = scheduledTasks.find(t => t.id === id);
      if (task) {
        task.dependencies.forEach(dep => traverseUp(dep.predecessorId));
      }
    };

    // Traverse Down (Successors)
    const traverseDown = (id: string) => {
      if (connected.has(id) && id !== hoveredTaskId) return;
      
      connected.add(id);
      
      // Find tasks that have this task as a predecessor
      scheduledTasks.forEach(t => {
        if (t.dependencies.some(d => d.predecessorId === id)) {
          traverseDown(t.id);
        }
      });
    };

    traverseUp(hoveredTaskId);
    traverseDown(hoveredTaskId);
    
    return connected;
  }, [hoveredTaskId, scheduledTasks]);

  const handleTaskUpdate = (updatedTask: Task) => {
    const newTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    updateTasksWithHistory(newTasks);
  };

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleZoomIn = () => {
    setSettings(prev => {
      if (prev.viewMode === 'Month') return { ...prev, viewMode: 'Week' };
      if (prev.viewMode === 'Week') return { ...prev, viewMode: 'Day' };
      return prev;
    });
  };

  const handleZoomOut = () => {
    setSettings(prev => {
      if (prev.viewMode === 'Day') return { ...prev, viewMode: 'Week' };
      if (prev.viewMode === 'Week') return { ...prev, viewMode: 'Month' };
      return prev;
    });
  };

  const handleAddTask = () => {
    const newId = (Math.max(...tasks.map(t => parseInt(t.id) || 0)) + 1).toString();
    
    // Find insertion index
    let insertIndex = tasks.length;
    if (selectedTaskId) {
      const selectedIndex = tasks.findIndex(t => t.id === selectedTaskId);
      if (selectedIndex !== -1) insertIndex = selectedIndex + 1;
    }

    const today = startOfDay(new Date());

    const newTask: Task = {
      id: newId,
      wbs: newId,
      name: 'New Task',
      duration: 1,
      startDate: today,
      endDate: today, // Will be recalculated by CPM
      dependencies: [],
      progress: 0,
      type: 'Task'
    };
    
    const newTasks = [...tasks];
    newTasks.splice(insertIndex, 0, newTask);
    updateTasksWithHistory(newTasks);
    setSelectedTaskId(newId);
  };

  const handleDeleteTask = () => {
    if (!selectedTaskId) return;
    // Also delete children? Or promote them?
    // Microsoft Project usually warns or deletes. Let's delete for simplicity.
    const idsToDelete = new Set<string>([selectedTaskId]);
    
    // Find all descendants
    let found = true;
    while (found) {
        found = false;
        tasks.forEach(t => {
            if (t.parentId && idsToDelete.has(t.parentId) && !idsToDelete.has(t.id)) {
                idsToDelete.add(t.id);
                found = true;
            }
        });
    }

    // Remove dependencies pointing to deleted tasks
    const remainingTasks = tasks.filter(t => !idsToDelete.has(t.id));
    const newTasks = remainingTasks.map(t => ({
        ...t,
        dependencies: t.dependencies.filter(d => !idsToDelete.has(d.predecessorId))
    }));
    
    updateTasksWithHistory(newTasks);
    setSelectedTaskId(null);
  };

  const handleIndentTask = () => {
    if (!selectedTaskId) return;
    const index = tasks.findIndex(t => t.id === selectedTaskId);
    if (index <= 0) return; // Can't indent first task

    const task = tasks[index];
    const prevTask = tasks[index - 1];
    
    const newTasks = [...tasks];
    newTasks[index] = { ...task, parentId: prevTask.id };
    newTasks[index - 1] = { ...prevTask, type: 'Phase', isExpanded: true };
    
    updateTasksWithHistory(newTasks);
  };

  const handleOutdentTask = () => {
    if (!selectedTaskId) return;
    const index = tasks.findIndex(t => t.id === selectedTaskId);
    if (index === -1) return;

    const task = tasks[index];
    if (!task.parentId) return; // Already at root

    const parent = tasks.find(t => t.id === task.parentId);
    if (!parent) return;

    // New parent is the parent's parent
    const newParentId = parent.parentId;
    
    const newTasks = [...tasks];
    newTasks[index] = { ...task, parentId: newParentId };
    
    updateTasksWithHistory(newTasks);
  };

  const handleMoveTaskUp = () => {
    if (!selectedTaskId) return;
    const index = tasks.findIndex(t => t.id === selectedTaskId);
    if (index <= 0) return; // Can't move up first task

    const newTasks = [...tasks];
    // Swap with previous task
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    
    updateTasksWithHistory(newTasks);
  };

  const handleMoveTaskDown = () => {
    if (!selectedTaskId) return;
    const index = tasks.findIndex(t => t.id === selectedTaskId);
    if (index === -1 || index >= tasks.length - 1) return; // Can't move down last task

    const newTasks = [...tasks];
    // Swap with next task
    [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    
    updateTasksWithHistory(newTasks);
  };

  // Calculate timeline bounds
  const timelineStart = useMemo(() => {
    if (scheduledTasks.length === 0) return addDays(settings.startDate, -7);
    const minDate = scheduledTasks.reduce((min, t) => t.startDate < min ? t.startDate : min, scheduledTasks[0].startDate);
    return addDays(minDate, -7);
  }, [scheduledTasks, settings.startDate]);

  const timelineEnd = useMemo(() => {
    if (scheduledTasks.length === 0) return addDays(settings.startDate, 28);
    const maxDate = scheduledTasks.reduce((max, t) => t.endDate > max ? t.endDate : max, scheduledTasks[0].endDate);
    return addDays(maxDate, 14);
  }, [scheduledTasks, settings.startDate]);

  // Calculate project stats
  const projectStats = useMemo(() => {
    if (scheduledTasks.length === 0) return { duration: 0, end: new Date() };
    
    // Find earliest start and latest end
    let minStart = scheduledTasks[0].startDate;
    let maxEnd = scheduledTasks[0].endDate;
    
    scheduledTasks.forEach(t => {
        if (t.startDate < minStart) minStart = t.startDate;
        if (t.endDate > maxEnd) maxEnd = t.endDate;
    });

    const duration = differenceInDays(maxEnd, minStart);
    return { duration, end: maxEnd };
  }, [scheduledTasks]);

  const handleExportPDF = async () => {
    if (!exportRef.current) return;

    // Show loading state if possible, or just alert user it might take a moment
    const originalTitle = document.title;
    document.title = "Exporting...";

    try {
        // Create a clone to manipulate for capture without affecting UI
        const element = exportRef.current;
        const clone = element.cloneNode(true) as HTMLElement;
        
        // Style the clone to be fully expanded
        Object.assign(clone.style, {
            position: 'absolute',
            top: '-9999px',
            left: '0',
            width: 'max-content', // Force it to be as wide as needed
            height: 'auto',
            overflow: 'visible',
            zIndex: '-1',
            backgroundColor: '#ffffff'
        });
        
        // Expand internal containers
        const scrollables = clone.querySelectorAll('.overflow-hidden, .overflow-auto, .overflow-y-auto, .overflow-x-hidden');
        scrollables.forEach(el => {
            const e = el as HTMLElement;
            e.style.overflow = 'visible';
            e.style.height = 'auto';
            e.style.width = 'auto';
            e.style.maxWidth = 'none';
            e.style.maxHeight = 'none';
        });

        // Fix Sticky Headers in Clone
        const stickies = clone.querySelectorAll('.sticky');
        stickies.forEach(el => {
            (el as HTMLElement).style.position = 'static';
        });

        // Specifically target the timeline container to ensure it expands
        const flexContainer = clone.querySelector('.flex.flex-1.overflow-hidden');
        if (flexContainer) {
            const e = flexContainer as HTMLElement;
            e.style.overflow = 'visible';
            e.style.height = 'auto';
            e.style.display = 'flex'; // Ensure flex layout is kept but expanded
            e.style.width = 'max-content'; // Force width to fit content
        }

        document.body.appendChild(clone);

        // Wait for images/fonts to settle
        await new Promise(resolve => setTimeout(resolve, 800));

        const fullWidth = clone.scrollWidth;
        const fullHeight = clone.scrollHeight;

        const canvas = await html2canvas(clone, {
            scale: 2, // High res
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: fullWidth + 100, // Ensure window is wide enough
            windowHeight: fullHeight + 100,
            width: fullWidth,
            height: fullHeight,
            x: 0,
            y: 0
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a3'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        // Calculate ratio to fit width
        const ratio = pageWidth / imgWidth;
        const scaledHeight = imgHeight * ratio;
        
        let heightLeft = scaledHeight;
        let position = 20; // Start below header
        let page = 1;

        // Header function
        const addHeader = () => {
             pdf.setFontSize(16);
             pdf.text(metadata.name, 10, 10);
             pdf.setFontSize(10);
             pdf.text(`Project #: ${metadata.number} | Author: ${metadata.author} | Updated: ${format(metadata.updatedAt, 'yyyy-MM-dd')} | Page ${page}`, 10, 16);
             
             // Add stats to PDF header as well
             pdf.setFontSize(9);
             pdf.text(`Total Duration: ${projectStats.duration} Days | End Date: ${format(projectStats.end, 'MMM d, yyyy')}`, pageWidth - 10, 16, { align: 'right' });
        };

        addHeader();
        
        // If height fits on one page
        if (scaledHeight <= (pageHeight - 20)) {
            pdf.addImage(imgData, 'PNG', 0, position, pageWidth, scaledHeight);
        } else {
            // Multi-page split
            while (heightLeft > 0) {
                pdf.addImage(imgData, 'PNG', 0, position, pageWidth, scaledHeight);
                heightLeft -= (pageHeight - 20);
                position -= (pageHeight - 20); // Move image up for next page
                
                if (heightLeft > 0) {
                    pdf.addPage();
                    page++;
                    addHeader();
                    position = 20 - ((page - 1) * (pageHeight - 20)); // Reset position logic
                }
            }
        }
        
        pdf.save(`${metadata.name.replace(/\s+/g, '_')}_Gantt.pdf`);
        document.body.removeChild(clone);

    } catch (err) {
        console.error("Export failed", err);
        alert("Failed to export PDF. Please try again.");
    } finally {
        document.title = originalTitle;
    }
  };

  return (
    <div className="flex h-full w-full bg-transparent text-white font-sans overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent" ref={exportRef}>
        {/* TOP TOOLBAR */}
        <div className="h-auto flex flex-col bg-transparent flex-shrink-0 z-20">
            {/* Title Section */}
            <div className="px-6 pt-6 lg:px-10 lg:pt-8 bg-transparent max-w-5xl">
               <h1 className="text-3xl md:text-4xl font-charter font-medium tracking-tight text-white mb-4">
                  Building a Custom Gantt Chart Tool with AI
               </h1>
               <div className="space-y-4 text-white/70 text-lg leading-[1.0]">
                 <p>
                   Project management in architecture often requires tools that are either too complex or too rigid. I wanted a Gantt chart that was lightweight, visually clean, and perfectly suited to our studio's workflow.
                 </p>
                 <p>
                   Instead of building it from scratch or buying off-the-shelf software, I used AI to generate a custom solution. By defining the exact constraints, data structures, and visual language I needed, the AI was able to scaffold the entire application in a fraction of the time it would typically take.
                 </p>
               </div>
            </div>
            
            {/* Tabs Row */}
            <div className="flex items-center justify-between px-6 lg:px-10 pt-6 bg-transparent gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={cn(
                    "px-6 py-3 text-sm font-medium rounded-xl transition-all flex items-center gap-2",
                    activeTab === 'overview' ? "bg-black/20 border border-white/10 text-primary" : "bg-surface hover:bg-surface/5 border border-white/10 transition-colors text-white/70"
                  )}
                >
                  <LayoutDashboard size={16} /> Overview
                </button>
                <button 
                  onClick={() => setActiveTab('scheduler')}
                  className={cn(
                    "px-6 py-3 text-sm font-medium rounded-xl transition-all flex items-center gap-2",
                    activeTab === 'scheduler' ? "bg-black/20 border border-white/10 text-primary" : "bg-surface hover:bg-surface/5 border border-white/10 transition-colors text-white/70"
                  )}
                >
                  <CalendarClock size={16} /> AI Scheduler
                </button>
                <button 
                  onClick={() => setActiveTab('cashflow')}
                  className={cn(
                    "px-6 py-3 text-sm font-medium rounded-xl transition-all flex items-center gap-2",
                    activeTab === 'cashflow' ? "bg-black/20 border border-white/10 text-primary" : "bg-surface hover:bg-surface/5 border border-white/10 transition-colors text-white/70"
                  )}
                >
                  <TrendingUp size={16} /> Cashflow S-Curve
                </button>
              </div>

              {/* Login Section moved here */}
              <div className="flex items-center gap-4 text-xs text-white/70 bg-surface border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="flex items-center gap-2">
                      <UserIcon size={12} />
                      <input 
                          className="outline-none bg-black/20 border border-white/10 focus:border-primary transition-colors text-white px-2 py-1 rounded-md w-32 text-right"
                          value={metadata.author}
                          onChange={(e) => setMetadata(m => ({ ...m, author: e.target.value }))}
                          placeholder="Author"
                      />
                  </div>
                  <div className="flex items-center gap-2">
                      <CalendarDays size={12} />
                      <span>Updated: {format(metadata.updatedAt, 'MMM d, yyyy')}</span>
                  </div>
              </div>
            </div>

            {/* Metadata Row */}
            <div className="px-6 py-4 flex items-center justify-between mt-6 mx-6 lg:mx-10 bg-surface border border-white/10 rounded-2xl mb-2">
                <div className="flex items-center gap-4">
                    <input 
                        className="font-bold text-lg tracking-tight outline-none bg-black/20 border border-white/10 focus:border-primary transition-colors text-white px-3 py-1 rounded-lg transition-colors w-64"
                        value={metadata.name}
                        onChange={(e) => setMetadata(m => ({ ...m, name: e.target.value }))}
                        placeholder="Project Name"
                    />
                    <div className="flex items-center gap-2 text-xs text-white/70">
                        <FileText size={12} />
                        <input 
                            className="outline-none bg-black/20 border border-white/10 focus:border-primary transition-colors text-white px-2 py-1 rounded-md w-24"
                            value={metadata.number}
                            onChange={(e) => setMetadata(m => ({ ...m, number: e.target.value }))}
                            placeholder="Project #"
                        />
                    </div>
                </div>
            </div>

            {/* Controls Row (Only show in Scheduler) */}
            {activeTab === 'scheduler' && (
            <div className="h-14 flex items-center justify-between px-6 mx-6 lg:mx-10 bg-surface border border-white/10 rounded-2xl mb-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button 
                    className="h-8 px-3 hover:text-primary rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors"
                    onClick={() => setIsAIModalOpen(true)}
                  >
                    <Sparkles size={14} /> AI Scheduler
                  </button>
                  <div className="h-6 w-px bg-gray-300/50 mx-1"></div>
                  <button 
                    className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors"
                    onClick={handleAddTask}
                  >
                    <Plus size={14} /> New Task
                  </button>
                  <div className="h-6 w-px bg-gray-300/50 mx-1"></div>
                  <button 
                    className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors disabled:opacity-50"
                    onClick={handleUndo}
                    disabled={currentHistoryIndex <= 0}
                    title="Undo"
                  >
                    <Undo size={14} />
                  </button>
                  <button 
                    className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors disabled:opacity-50"
                    onClick={handleRedo}
                    disabled={currentHistoryIndex >= history.length - 1}
                    title="Redo"
                  >
                    <Redo size={14} />
                  </button>
                  <div className="h-6 w-px bg-gray-300/50 mx-1"></div>
                  <button 
                    className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors disabled:opacity-50"
                    onClick={handleIndentTask}
                    disabled={!selectedTaskId}
                    title="Indent Task (Tab)"
                  >
                    <Indent size={14} />
                  </button>
                  <button 
                    className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors disabled:opacity-50"
                    onClick={handleOutdentTask}
                    disabled={!selectedTaskId}
                    title="Outdent Task (Shift+Tab)"
                  >
                    <Outdent size={14} />
                  </button>
                  <button 
                    className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors disabled:opacity-50"
                    onClick={handleMoveTaskUp}
                    disabled={!selectedTaskId || tasks.findIndex(t => t.id === selectedTaskId) <= 0}
                    title="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button 
                    className="h-8 px-3 rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors disabled:opacity-50"
                    onClick={handleMoveTaskDown}
                    disabled={!selectedTaskId || tasks.findIndex(t => t.id === selectedTaskId) >= tasks.length - 1}
                    title="Move Down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button 
                    className="h-8 px-3 hover:text-red-600 rounded-lg flex items-center gap-2 text-sm font-medium text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors disabled:opacity-50"
                    onClick={handleDeleteTask}
                    disabled={!selectedTaskId}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>

                <div className="h-6 w-px bg-gray-300/50"></div>

                {/* Project Start Date */}
                <div className="flex items-center gap-2 bg-black/20 border border-white/10 px-2 py-1 rounded-lg">
                   <CalendarIcon size={14} className="text-gray-500 ml-2" />
                   <input 
                      type="date" 
                      className="bg-transparent text-xs font-medium text-white outline-none cursor-pointer"
                      value={format(settings.startDate, 'yyyy-MM-dd')}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!isNaN(date.getTime())) {
                            setSettings(s => ({ ...s, startDate: date }));
                        }
                      }}
                   />
                </div>

                {/* Calendar Controls */}
                <div className="flex items-center gap-2 bg-black/20 border border-white/10 p-1 rounded-lg">
                  <button
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium transition-all",
                      settings.isWorkingDays 
                        ? "bg-surface border border-white/10 text-primary" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setSettings(s => ({ ...s, isWorkingDays: !s.isWorkingDays }))}
                  >
                    Working Days
                  </button>
                  
                  {settings.isWorkingDays && (
                    <select 
                      className="bg-transparent text-xs font-medium text-white outline-none cursor-pointer"
                      value={settings.calendarMode}
                      onChange={(e) => setSettings(s => ({ ...s, calendarMode: e.target.value as any }))}
                    >
                      <option value="Standard">Standard (Mon-Fri)</option>
                      <option value="Sydney">Sydney Holidays</option>
                      <option value="Melbourne">Melbourne Holidays</option>
                    </select>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-black/20 border border-white/10 p-1 rounded-lg">
                  <button 
                    className={cn(
                      "p-1.5 rounded-md transition-all",
                      settings.showCriticalPath ? "bg-surface border border-white/10 text-red-600" : "text-white/70 hover:text-white"
                    )}
                    onClick={() => setSettings(s => ({ ...s, showCriticalPath: !s.showCriticalPath }))}
                    title="Toggle Critical Path"
                  >
                    <div className="w-4 h-4 font-bold text-[10px] flex items-center justify-center">CP</div>
                  </button>
                  <button 
                    className={cn(
                      "p-1.5 rounded-md transition-all",
                      settings.showDependencies ? "bg-surface border border-white/10 text-primary" : "text-white/70 hover:text-white"
                    )}
                    onClick={() => setSettings(s => ({ ...s, showDependencies: !s.showDependencies }))}
                    title="Toggle Dependencies"
                  >
                    <div className="w-4 h-4 font-bold text-[10px] flex items-center justify-center">Dep</div>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button 
                    className="p-2 rounded-lg text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors"
                    onClick={handleZoomOut}
                  >
                    <ZoomOut size={18} />
                  </button>
                  <span className="text-xs font-medium text-white/70 w-12 text-center">{settings.viewMode}</span>
                  <button 
                    className="p-2 rounded-lg text-white/70 bg-surface hover:bg-surface/5 border border-white/10 transition-colors transition-colors"
                    onClick={handleZoomIn}
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>

                <div className="h-6 w-px bg-gray-300/50"></div>
                <button 
                    className="h-8 px-3 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors bg-surface hover:bg-surface/5 border border-white/10 transition-colors"
                    onClick={handleExportPDF}
                >
                    <Download size={14} /> Export PDF
                </button>
              </div>
            </div>
            )}
        </div>

        {/* TAB CONTENT */}
        <div className="flex-1 flex overflow-hidden relative bg-transparent px-6 lg:px-10 pb-6">
          {activeTab === 'overview' && (
            <ProjectOverview 
              metadata={metadata} 
              setMetadata={setMetadata} 
              settings={settings}
              projectStats={projectStats}
              totalBudget={trades.reduce((sum, t) => sum + t.projectedCost, 0)}
              trades={trades}
              setTrades={setTrades}
            />
          )}

          {activeTab === 'cashflow' && (
            <Cashflow 
              totalBudget={trades.reduce((sum, t) => sum + t.projectedCost, 0)}
              totalActual={trades.reduce((sum, t) => sum + t.actualCost, 0)}
              startDate={settings.startDate}
              endDate={projectStats.end}
            />
          )}

          {activeTab === 'scheduler' && (
            <>
              {/* LEFT PANE: TASK GRID */}
              <GridPane 
                tasks={scheduledTasks} 
                settings={settings} 
                onTaskUpdate={handleTaskUpdate}
                onTaskSelect={handleTaskSelect}
                onTaskHover={setHoveredTaskId}
                onAddTask={handleAddTask}
                onIndentTask={handleIndentTask}
                onOutdentTask={handleOutdentTask}
                onReorder={handleReorder}
                selectedTaskId={selectedTaskId}
                width={leftPaneWidth}
              />

              {/* RESIZER */}
              <div 
                className="w-px bg-gray-200 hover:bg-primary hover:w-1 cursor-col-resize z-30 flex-shrink-0 transition-all"
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startWidth = leftPaneWidth;
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    setLeftPaneWidth(Math.max(300, Math.min(800, startWidth + (moveEvent.clientX - startX))));
                  };
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              />

              {/* RIGHT PANE: GANTT CHART */}
              <TimelinePane 
                tasks={scheduledTasks} 
                settings={settings} 
                onTaskUpdate={handleTaskUpdate}
                onTaskSelect={handleTaskSelect}
                onTaskHover={setHoveredTaskId}
                selectedTaskId={selectedTaskId}
                highlightedTasks={highlightedDependencyChain}
                startDate={timelineStart}
                endDate={timelineEnd}
              />
            </>
          )}
        </div>
      </div>

      <AISchedulerDialog 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGenerated}
        currentTasks={tasks}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        onUpdateMetadata={(updates) => setMetadata(prev => ({ ...prev, ...updates }))}
      />
    </div>
  );
}
