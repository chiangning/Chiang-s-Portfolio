import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Task, ProjectSettings, Dependency } from '../../types';
import { format } from 'date-fns';
import { ChevronRight, ChevronDown, Plus, StickyNote, X, Settings2, GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface GridPaneProps {
  tasks: Task[];
  settings: ProjectSettings;
  onTaskUpdate: (task: Task) => void;
  onTaskSelect: (taskId: string) => void;
  onTaskHover: (taskId: string | null) => void;
  onAddTask?: () => void;
  onIndentTask?: () => void;
  onOutdentTask?: () => void;
  onReorder?: (newTasks: Task[]) => void;
  selectedTaskId: string | null;
  width: number;
}

const DependencyEditor: React.FC<{
  task: Task;
  tasks: Task[];
  onUpdate: (deps: Dependency[]) => void;
  onClose: () => void;
  anchorRect: DOMRect | null;
}> = ({ task, tasks, onUpdate, onClose, anchorRect }) => {
  const [deps, setDeps] = useState<Dependency[]>(task.dependencies);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleAdd = () => {
    setDeps([...deps, { predecessorId: '', type: 'FS', lag: 0 }]);
  };

  const handleRemove = (index: number) => {
    const newDeps = [...deps];
    newDeps.splice(index, 1);
    setDeps(newDeps);
    onUpdate(newDeps);
  };

  const handleChange = (index: number, field: keyof Dependency, value: any) => {
    const newDeps = [...deps];
    newDeps[index] = { ...newDeps[index], [field]: value };
    setDeps(newDeps);
    onUpdate(newDeps);
  };

  // Helper to map display ID (row index) to internal ID
  const getInternalId = (displayId: string) => {
    const idx = parseInt(displayId);
    if (!isNaN(idx) && idx > 0 && idx <= tasks.length) {
      return tasks[idx - 1].id;
    }
    return '';
  };

  // Helper to map internal ID to display ID
  const getDisplayId = (internalId: string) => {
    const idx = tasks.findIndex(t => t.id === internalId);
    return idx !== -1 ? (idx + 1).toString() : '';
  };

  if (!anchorRect) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    top: `${anchorRect.bottom + 5}px`,
    left: `${anchorRect.right - 320}px`, // Align right edge
    width: '320px',
    maxHeight: '300px',
  };

  return createPortal(
    <div ref={ref} className="z-[9999] bg-transparent rounded-xl p-4 flex flex-col shadow-lg shadow-black/20" style={style}>
      <h4 className="text-sm font-semibold mb-3 text-white">Dependencies</h4>
      <div className="space-y-2 overflow-y-auto flex-1 pr-2">
        {deps.map((dep, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <select
              className="w-32 bg-black/20 border border-white/10 rounded-lg px-2 py-1.5 text-white truncate outline-none"
              value={dep.predecessorId}
              onChange={(e) => handleChange(i, 'predecessorId', e.target.value)}
            >
              <option value="">Select Task...</option>
              {tasks.map((t, idx) => (
                <option key={t.id} value={t.id} disabled={t.id === task.id}>
                  {idx + 1}. {t.name}
                </option>
              ))}
            </select>
            <select
              className="flex-1 bg-black/20 border border-white/10 rounded-lg px-2 py-1.5 text-white outline-none"
              value={dep.type}
              onChange={(e) => handleChange(i, 'type', e.target.value)}
            >
              <option value="FS">FS</option>
              <option value="FF">FF</option>
              <option value="SS">SS</option>
              <option value="SF">SF</option>
            </select>
            <input
              type="number"
              className="w-12 bg-black/20 border border-white/10 rounded-lg px-2 py-1.5 text-white outline-none"
              placeholder="Lag"
              value={dep.lag}
              onChange={(e) => handleChange(i, 'lag', parseInt(e.target.value) || 0)}
            />
            <button onClick={() => handleRemove(i)} className="text-white/70 hover:text-red-500 bg-surface hover:bg-surface/5 border border-white/10 transition-colors p-1.5 rounded-md">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAdd}
        className="mt-4 w-full flex items-center justify-center gap-1 text-xs font-medium text-primary bg-surface hover:bg-surface/5 border border-white/10 transition-colors py-2 rounded-lg transition-colors"
      >
        <Plus size={12} /> Add Dependency
      </button>
    </div>,
    document.body
  );
};

const TaskDetailsDialog: React.FC<{
  task: Task;
  onSave: (updates: Partial<Task>) => void;
  onClose: () => void;
}> = ({ task, onSave, onClose }) => {
  const [notes, setNotes] = useState(task.notes || '');
  const [progress, setProgress] = useState(task.progress || 0);

  const handleSave = () => {
    onSave({ notes, progress });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-transparent rounded-2xl w-96 p-6 shadow-lg shadow-black/20" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Task Details</h3>
            <button onClick={onClose} className="text-white hover:text-white bg-surface hover:bg-surface/5 border border-white/10 transition-colors p-2 rounded-full">
                <X size={18} />
            </button>
        </div>
        
        <div className="space-y-5">
            <div>
                <label className="block text-xs font-medium text-white uppercase mb-2">Task Name</label>
                <div className="text-sm font-medium text-white bg-black/20 border border-white/10 px-4 py-2.5 rounded-xl">{task.name}</div>
            </div>

            <div>
                <label className="block text-xs font-medium text-white uppercase mb-2">Progress (%)</label>
                <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={progress} 
                    onChange={(e) => setProgress(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-white uppercase mb-2">Notes</label>
                <textarea 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white h-32 resize-none outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Add notes here..."
                />
            </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
            <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-white bg-surface hover:bg-surface/5 border border-white/10 transition-colors rounded-xl transition-colors">
                Cancel
            </button>
            <button onClick={handleSave} className="px-5 py-2.5 text-sm font-medium text-primary bg-surface hover:bg-surface/5 border border-white/10 transition-colors rounded-xl transition-colors">
                Save Changes
            </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const SortableTaskRow = ({
  task,
  index,
  settings,
  selectedTaskId,
  onTaskSelect,
  onTaskHover,
  editingCell,
  setEditingTaskDetailsId,
  handleCellClick,
  handleCellChange,
  handleCellBlur,
  getDisplayDependencies,
  DependencyEditor,
  tasks,
  onTaskUpdate
}: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    position: isDragging ? 'relative' as const : 'static' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center h-12 border-b border-white/5 text-sm hover:bg-primary/10 transition-colors group",
        index % 2 === 0 ? "bg-transparent" : "bg-secondary/10",
        selectedTaskId === task.id ? "bg-primary/20" : "",
        task.isCritical && settings.showCriticalPath ? "bg-red-50/50" : "",
        isDragging ? "bg-surface border border-white/10 opacity-90 bg-surface" : ""
      )}
      onClick={() => onTaskSelect(task.id)}
      onMouseEnter={() => onTaskHover(task.id)}
      onMouseLeave={() => onTaskHover(null)}
    >
      <div 
        className="w-10 flex justify-center text-white/70 text-xs font-mono border-r border-white/5 h-full items-center select-none cursor-grab active:cursor-grabbing hover:text-white"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="group-hover:hidden">{index + 1}</span>
      </div>

      <div 
          className="w-8 flex justify-center border-r border-white/5 h-full items-center text-white/70 hover:text-primary cursor-pointer"
          onClick={(e) => {
              e.stopPropagation();
              setEditingTaskDetailsId(task.id);
          }}
      >
          <StickyNote size={14} className={cn(
              "transition-colors",
              (task.notes || task.progress > 0) ? "text-primary fill-secondary/30" : "opacity-30 hover:opacity-100"
          )} />
      </div>
      
      <div className="flex-1 px-4 border-r border-white/5 h-full flex items-center min-w-0">
        <div 
          className="flex items-center w-full"
          style={{ paddingLeft: task.parentId ? '1.5rem' : '0' }}
        >
          {task.type === 'Phase' && (
            <button className="mr-1 text-white hover:text-white">
              {task.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
          {editingCell?.id === task.id && editingCell?.field === 'name' ? (
            <input
              autoFocus
              className="w-full bg-transparent outline-none border-b border-primary text-white"
              value={task.name}
              onChange={(e) => handleCellChange(e, task, 'name')}
              onBlur={handleCellBlur}
            />
          ) : (
            <span 
              className={cn(
                "truncate cursor-text w-full block",
                task.type === 'Phase' ? "font-bold text-white uppercase tracking-wide text-xs" : "text-white",
                task.isCritical && settings.showCriticalPath ? "text-red-600 font-medium" : ""
              )}
              onClick={(e) => { e.stopPropagation(); handleCellClick(e, task.id, 'name'); }}
            >
              {task.name}
            </span>
          )}
        </div>
      </div>

      <div className="w-12 px-2 text-center border-r border-white/5 h-full flex items-center justify-center text-white">
        {editingCell?.id === task.id && editingCell?.field === 'duration' ? (
          <input
            autoFocus
            type="number"
            className="w-full text-center bg-transparent outline-none border-b border-primary text-white"
            value={task.duration}
            onChange={(e) => handleCellChange(e, task, 'duration')}
            onBlur={handleCellBlur}
          />
        ) : (
          <span 
            className="cursor-text w-full block"
            onClick={(e) => { e.stopPropagation(); handleCellClick(e, task.id, 'duration'); }}
          >
            {task.duration}d
          </span>
        )}
      </div>

      <div className="w-12 px-2 text-center border-r border-white/5 h-full flex items-center justify-center text-white">
        {editingCell?.id === task.id && editingCell?.field === 'progress' ? (
          <input
            autoFocus
            type="number"
            min="0"
            max="100"
            className="w-full text-center bg-transparent outline-none border-b border-primary text-white"
            value={task.progress}
            onChange={(e) => handleCellChange(e, task, 'progress')}
            onBlur={handleCellBlur}
          />
        ) : (
          <span 
            className="cursor-text w-full block"
            onClick={(e) => { e.stopPropagation(); handleCellClick(e, task.id, 'progress'); }}
          >
            {task.progress}%
          </span>
        )}
      </div>

      <div className="w-20 px-2 border-r border-white/5 h-full flex items-center text-white text-xs">
        {format(task.startDate, 'MMM d')}
      </div>

      <div className="w-20 px-2 border-r border-white/5 h-full flex items-center text-white text-xs">
        {format(task.endDate, 'MMM d')}
      </div>
      
      <div className="w-16 px-2 border-r border-white/5 h-full flex items-center justify-center text-white text-xs truncate relative">
        {editingCell?.id === task.id && editingCell?.field === 'dependencies' ? (
          <>
            <span 
              className="cursor-pointer w-full block truncate text-primary font-medium"
              onClick={(e) => { e.stopPropagation(); /* Keep open */ }}
            >
              {getDisplayDependencies(task)}
            </span>
            <DependencyEditor 
              task={task} 
              tasks={tasks}
              onUpdate={(newDeps) => onTaskUpdate({ ...task, dependencies: newDeps })}
              onClose={handleCellBlur}
              anchorRect={editingCell.rect || null}
            />
          </>
        ) : (
          <span 
            className="cursor-pointer w-full block truncate hover:text-primary"
            onClick={(e) => { e.stopPropagation(); handleCellClick(e, task.id, 'dependencies'); }}
          >
            {getDisplayDependencies(task)}
          </span>
        )}
      </div>
    </div>
  );
};

export const GridPane: React.FC<GridPaneProps> = ({
  tasks,
  settings,
  onTaskUpdate,
  onTaskSelect,
  onTaskHover,
  onAddTask,
  onIndentTask,
  onOutdentTask,
  onReorder,
  selectedTaskId,
  width,
}) => {
  const [editingCell, setEditingCell] = useState<{ id: string, field: keyof Task | 'dependencies', rect?: DOMRect } | null>(null);
  const [editingTaskDetailsId, setEditingTaskDetailsId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require slight movement to start drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      
      if (onReorder) {
        onReorder(arrayMove(tasks, oldIndex, newIndex));
      }
    }
  };

  const handleCellClick = (e: React.MouseEvent, id: string, field: keyof Task | 'dependencies') => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setEditingCell({ id, field, rect });
  };


  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        onOutdentTask?.();
      } else {
        onIndentTask?.();
      }
    }
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, task: Task, field: keyof Task | 'dependencies') => {
    let value: any = e.target.value;
    
    if (field === 'duration') {
      value = parseInt(value) || 0;
      onTaskUpdate({ ...task, duration: value });
    } else if (field === 'progress') {
      value = Math.min(100, Math.max(0, parseInt(value) || 0));
      onTaskUpdate({ ...task, progress: value });
    } else if (field === 'dependencies') {
      // Parse dependencies: "1, 2FS, 3FF+2d"
      const depStrings = value.split(',').map((s: string) => s.trim()).filter((s: string) => s);
      const newDeps: Dependency[] = [];
      
      const depRegex = /^(\d+)\s*(FS|FF|SS|SF)?\s*([+-]?\d+d?)?$/i;

      depStrings.forEach((str: string) => {
          const match = str.match(depRegex);
          if (match) {
              const displayId = match[1];
              const type = (match[2] ? match[2].toUpperCase() : 'FS') as 'FS' | 'FF' | 'SS' | 'SF';
              let lag = 0;
              if (match[3]) {
                  lag = parseInt(match[3].replace('d', ''));
              }

              const idx = parseInt(displayId);
              if (!isNaN(idx) && idx > 0 && idx <= tasks.length) {
                  const targetTask = tasks[idx - 1];
                  if (targetTask.id !== task.id) {
                      newDeps.push({
                          predecessorId: targetTask.id,
                          type: type,
                          lag: lag
                      });
                  }
              }
          }
      });
      
      onTaskUpdate({ ...task, dependencies: newDeps });
    } else {
      onTaskUpdate({ ...task, [field]: value });
    }
  };

  // Helper to get dependencies as display IDs
  const getDisplayDependencies = (task: Task) => {
      if (!task.dependencies.length) return '-';
      return task.dependencies.map(d => {
          const predIndex = tasks.findIndex(t => t.id === d.predecessorId);
          if (predIndex === -1) return '?';
          
          const id = predIndex + 1;
          let text = `${id}`;
          
          // Append type if not FS
          if (d.type !== 'FS') {
              text += d.type;
          }
          
          // Append lag if not 0
          if (d.lag !== 0) {
              text += d.lag > 0 ? `+${d.lag}d` : `${d.lag}d`;
          }
          
          return text;
      }).join(', ');
  };

  return (
    <div 
      className="bg-transparent border-r border-white/5 flex flex-col h-full overflow-hidden shadow-sm z-10"
      style={{ width }}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Make focusable for keyboard events
    >
      {/* Header */}
      <div className="h-16 bg-transparent border-b border-white/5 flex items-center text-xs font-semibold text-white uppercase tracking-wider select-none">
        <div className="w-10 flex justify-center border-r border-white/5">ID</div>
        <div className="w-8 flex justify-center border-r border-white/5">
            <StickyNote size={14} />
        </div>
        <div className="flex-1 px-4 border-r border-white/5">Task Name</div>
        <div className="w-12 px-2 text-center border-r border-white/5">Dur</div>
        <div className="w-12 px-2 text-center border-r border-white/5">%</div>
        <div className="w-20 px-2 border-r border-white/5">Start</div>
        <div className="w-20 px-2 border-r border-white/5">Finish</div>
        <div className="w-16 px-2 border-r border-white/5 text-center">Pred</div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-black/20 border border-white/10 rounded-b-xl m-2 mt-0">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={tasks.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task, index) => (
              <SortableTaskRow
                key={task.id}
                task={task}
                index={index}
                settings={settings}
                selectedTaskId={selectedTaskId}
                onTaskSelect={onTaskSelect}
                onTaskHover={onTaskHover}
                editingCell={editingCell}
                setEditingTaskDetailsId={setEditingTaskDetailsId}
                handleCellClick={handleCellClick}
                handleCellChange={handleCellChange}
                handleCellBlur={handleCellBlur}
                getDisplayDependencies={getDisplayDependencies}
                DependencyEditor={DependencyEditor}
                tasks={tasks}
                onTaskUpdate={onTaskUpdate}
              />
            ))}
          </SortableContext>
        </DndContext>
        
        {/* Add Task Button */}
        <button 
          className="w-full h-12 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-secondary/30 transition-colors border-b border-white/10/50 text-sm font-medium"
          onClick={onAddTask}
        >
          <Plus size={16} className="mr-2" /> Add Task
        </button>
      </div>

      {editingTaskDetailsId && (() => {
          const task = tasks.find(t => t.id === editingTaskDetailsId);
          if (!task) return null;
          return (
              <TaskDetailsDialog 
                  task={task}
                  onSave={(updates) => onTaskUpdate({ ...task, ...updates })}
                  onClose={() => setEditingTaskDetailsId(null)}
              />
          );
      })()}
    </div>
  );
};
