import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Task, ProjectSettings } from '../../types';
import { cn } from '../../lib/utils';
import { format, addDays, differenceInDays, isWeekend, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval, eachMonthOfInterval, startOfMonth, endOfMonth, addWeeks, eachWeekOfInterval, differenceInWeeks, getWeek, addMonths, differenceInMonths } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { DependencyLines } from './DependencyLines';

interface TimelinePaneProps {
  tasks: Task[];
  settings: ProjectSettings;
  onTaskUpdate: (task: Task) => void;
  onTaskSelect: (taskId: string) => void;
  onTaskHover: (taskId: string | null) => void;
  selectedTaskId: string | null;
  highlightedTasks: Set<string>;
  startDate: Date;
  endDate: Date;
}

const HEADER_HEIGHT = 64; // Matches grid header (h-16)
const ROW_HEIGHT = 48; // Matches grid row

export const TimelinePane: React.FC<TimelinePaneProps> = ({
  tasks,
  settings,
  onTaskUpdate,
  onTaskSelect,
  onTaskHover,
  selectedTaskId,
  highlightedTasks,
  startDate,
  endDate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  // Determine Cell Width based on View Mode
  const CELL_WIDTH = useMemo(() => {
    switch (settings.viewMode) {
      case 'Day': return 40;
      case 'Week': return 30; // per day, but we might render differently
      case 'Month': return 10; // per day
      default: return 40;
    }
  }, [settings.viewMode]);

  // Calculate total width based on days
  const totalDays = differenceInDays(endDate, startDate) + 1;
  const totalWidth = totalDays * CELL_WIDTH;

  const handleMouseDown = (e: React.MouseEvent, task: Task) => {
    if (task.type === 'Phase') return; // Prevent dragging phases (they are calculated)
    e.stopPropagation();
    setIsDragging(task.id);
    setDragOffset(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - dragOffset;
    const daysDiff = Math.round(diff / CELL_WIDTH);
    
    if (daysDiff !== 0) {
      // Update task start date
      const task = tasks.find(t => t.id === isDragging);
      if (task) {
        const newStart = addDays(task.startDate, daysDiff);
        const newEnd = addDays(task.endDate, daysDiff);
        onTaskUpdate({ ...task, startDate: newStart, endDate: newEnd });
        setDragOffset(e.clientX); // Reset offset to avoid jump
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Render Time Headers
  const renderHeaders = () => {
    if (settings.viewMode === 'Day') {
      const months = eachMonthOfInterval({ start: startDate, end: endDate });
      const days = eachDayOfInterval({ start: startDate, end: endDate });
      
      return (
        <>
          {/* Top Row: Months */}
          <div className="flex-1 flex border-b border-white/5 bg-transparent text-white">
            {months.map((month, i) => {
              const daysInMonth = differenceInDays(
                i === months.length - 1 ? endDate : endOfMonth(month),
                i === 0 ? startDate : startOfMonth(month)
              ) + 1;
              return (
                <div 
                  key={month.toISOString()} 
                  className="flex items-center px-4 text-xs font-medium border-r border-white/5 uppercase tracking-wider sticky left-0"
                  style={{ width: daysInMonth * CELL_WIDTH }}
                >
                  {format(month, 'MMMM yyyy')}
                </div>
              );
            })}
          </div>
          {/* Bottom Row: Days */}
          <div className="flex-1 flex bg-transparent text-white">
            {days.map(day => (
              <div 
                key={day.toISOString()} 
                className={cn(
                  "flex items-center justify-center border-r border-white/5 text-[10px] font-semibold",
                  isSameDay(day, new Date()) ? "text-primary bg-secondary/30" : ""
                )}
                style={{ 
                    width: CELL_WIDTH,
                    backgroundColor: isWeekend(day) ? 'rgba(0, 0, 0, 0.02)' : undefined
                }}
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>
        </>
      );
    } 
    else if (settings.viewMode === 'Week') {
      const weeks = eachWeekOfInterval({ start: startDate, end: endDate });
      
      return (
        <>
          {/* Top Row: Months */}
          <div className="flex-1 flex border-b border-white/5 bg-transparent text-white">
             {weeks.map((week, i) => {
                const isFirstOfWeek = i === 0 || week.getMonth() !== weeks[i-1].getMonth();
                const width = 7 * CELL_WIDTH;
                // Only show month label if it changes or it's the first one, but we need to fill space
                // Simplified: Just show Month-Year for every week but hide text if same? 
                // Better: Just render week ranges
                return (
                  <div 
                    key={week.toISOString()} 
                    className="flex items-center justify-center text-xs font-medium border-r border-white/5 uppercase tracking-wider"
                    style={{ width }}
                  >
                    {format(week, 'MMM yyyy')}
                  </div>
                );
             })}
          </div>
          {/* Bottom Row: Weeks */}
          <div className="flex-1 flex bg-transparent text-white">
            {weeks.map(week => (
              <div 
                key={week.toISOString()} 
                className={cn(
                  "flex items-center justify-center border-r border-white/5 text-[10px] font-semibold",
                  isSameDay(week, startOfWeek(new Date())) ? "text-primary bg-secondary/30" : ""
                )}
                style={{ width: 7 * CELL_WIDTH }}
              >
                W{getWeek(week)}
              </div>
            ))}
          </div>
        </>
      );
    }
    else if (settings.viewMode === 'Month') {
      const months = eachMonthOfInterval({ start: startDate, end: endDate });
      return (
        <>
           {/* Top Row: Years */}
           <div className="flex-1 flex border-b border-white/5 bg-transparent text-white">
              {months.map((month) => (
                  <div 
                    key={`year-${month.toISOString()}`}
                    className="flex items-center justify-center text-xs font-medium border-r border-white/5 uppercase tracking-wider"
                    style={{ width: differenceInDays(endOfMonth(month), startOfMonth(month)) * CELL_WIDTH + CELL_WIDTH }} 
                  >
                    {format(month, 'yyyy')}
                  </div>
              ))}
           </div>
           {/* Bottom Row: Months */}
           <div className="flex-1 flex bg-transparent text-white">
            {months.map(month => {
               const daysInMonth = differenceInDays(endOfMonth(month), startOfMonth(month)) + 1;
               return (
                <div 
                  key={month.toISOString()} 
                  className={cn(
                    "flex items-center justify-center border-r border-white/5 text-[10px] font-semibold",
                    month.getMonth() === new Date().getMonth() && month.getFullYear() === new Date().getFullYear() ? "text-primary bg-secondary/30" : ""
                  )}
                  style={{ width: daysInMonth * CELL_WIDTH }}
                >
                  {format(month, 'MMM')}
                </div>
               );
            })}
          </div>
        </>
      );
    }
  };

  // Render Grid Lines
  const renderGridLines = () => {
    if (settings.viewMode === 'Day') {
       const days = eachDayOfInterval({ start: startDate, end: endDate });
       return days.map(day => (
        <div 
          key={`grid-${day.toISOString()}`} 
          className="border-r border-white/5 h-full absolute top-0 bottom-0"
          style={{ 
            width: CELL_WIDTH,
            left: differenceInDays(day, startDate) * CELL_WIDTH,
            backgroundColor: isWeekend(day) ? 'rgba(0, 0, 0, 0.02)' : undefined
          }}
        />
      ));
    } else if (settings.viewMode === 'Week') {
      const weeks = eachWeekOfInterval({ start: startDate, end: endDate });
      return weeks.map(week => (
        <div 
          key={`grid-${week.toISOString()}`} 
          className="border-r border-white/5 h-full absolute top-0 bottom-0"
          style={{ 
            width: 7 * CELL_WIDTH,
            left: differenceInDays(week, startDate) * CELL_WIDTH
          }}
        />
      ));
    } else {
      const months = eachMonthOfInterval({ start: startDate, end: endDate });
      return months.map(month => {
        const startOffset = differenceInDays(month, startDate);
        const daysInMonth = differenceInDays(endOfMonth(month), startOfMonth(month)) + 1;
        return (
          <div 
            key={`grid-${month.toISOString()}`} 
            className="border-r border-white/5 h-full absolute top-0 bottom-0"
            style={{ 
              width: daysInMonth * CELL_WIDTH,
              left: startOffset * CELL_WIDTH
            }}
          />
        );
      });
    }
  };

  return (
    <div className="flex-1 h-full overflow-auto bg-transparent relative select-none" ref={containerRef}>
      <div style={{ width: totalWidth, minHeight: '100%' }}>
        
        {/* Timeline Header */}
        <div className="sticky top-0 z-20 bg-transparent border-b border-white/5 flex flex-col shadow-sm" style={{ height: HEADER_HEIGHT }}>
          {renderHeaders()}
        </div>

        {/* Timeline Body */}
        <div className="relative">
          {/* Grid Lines */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {renderGridLines()}
            {/* Today Line */}
            <div 
              className="absolute top-0 bottom-0 border-l-2 border-primary/50 z-10 dashed"
              style={{ left: differenceInDays(new Date(), startDate) * CELL_WIDTH + (CELL_WIDTH/2) }}
            >
                <div className="absolute top-0 -translate-x-1/2 bg-surface border border-white/10 text-primary text-[9px] font-bold px-2 py-1 rounded-b-md whitespace-nowrap">
                    We are here
                </div>
            </div>
          </div>

          {/* Dependency Lines Layer */}
          {settings.showDependencies && (
             <DependencyLines 
                tasks={tasks} 
                startDate={startDate} 
                cellWidth={CELL_WIDTH} 
                rowHeight={ROW_HEIGHT}
                headerHeight={0} 
                highlightedTasks={highlightedTasks}
             />
          )}

          {/* Task Bars */}
          <div className="relative z-10 pt-2">
            {tasks.map((task, index) => {
              const startOffset = differenceInDays(task.startDate, startDate);
              const duration = task.duration; 
              const width = duration * CELL_WIDTH;
              const left = startOffset * CELL_WIDTH;
              const isHighlighted = highlightedTasks.has(task.id);

              return (
                <div 
                  key={task.id}
                  className="relative group"
                  style={{ height: ROW_HEIGHT }}
                >
                  {/* The Bar */}
                  <motion.div
                    layoutId={`task-${task.id}`}
                    initial={false}
                    className={cn(
                      "absolute top-1.5 h-7 flex items-center px-2 text-xs whitespace-nowrap overflow-hidden transition-all duration-200 select-none",
                      (task.type === 'Milestone' || task.duration === 0) ? "w-5 h-5 rounded-full bg-surface border border-white/10 border-2 border-white top-2.5" : "rounded-full bg-surface border border-white/10",
                      task.type === 'Phase' ? "bg-white h-2 top-4 rounded-full shadow-inner" : "",
                      task.type === 'Task' && task.duration > 0 && !task.isCritical ? "text-white" : "",
                      task.type === 'Task' && task.duration > 0 && task.isCritical && settings.showCriticalPath ? "text-red-600 border-red-200" : "",
                      selectedTaskId === task.id ? "ring-2 ring-primary ring-offset-1 ring-offset-[#e0e0e0]" : "",
                      isHighlighted ? "ring-2 ring-primary ring-offset-1 ring-offset-[#e0e0e0] z-20" : "",
                      task.type !== 'Phase' ? "cursor-grab active:cursor-grabbing hover:shadow-lg shadow-black/20" : ""
                    )}
                    style={{ 
                      left: startOffset * CELL_WIDTH, 
                      width: (task.type === 'Milestone' || task.duration === 0) ? 20 : Math.max(task.duration * CELL_WIDTH, CELL_WIDTH), // Fixed width for circle
                      transform: 'none' // Remove rotation
                    }}
                    onMouseDown={(e) => handleMouseDown(e, task)}
                    onClick={() => onTaskSelect(task.id)}
                    onMouseEnter={() => onTaskHover(task.id)}
                    onMouseLeave={() => onTaskHover(null)}
                  >
                    {/* Progress Fill */}
                    {task.type === 'Task' && (
                      <div 
                        className="absolute top-0 left-0 bottom-0 bg-primary/20 transition-all duration-300" 
                        style={{ width: `${task.progress}%` }} 
                      />
                    )}

                    {/* Content */}
                    {task.type === 'Task' && (task.duration * CELL_WIDTH) > 60 && (
                      <span className="relative z-10 truncate font-medium">
                        {task.name}
                      </span>
                    )}
                  </motion.div>

                  {/* Label outside if narrow */}
                  {task.type === 'Task' && (task.duration * CELL_WIDTH) <= 60 && (
                     <div 
                        className="absolute top-1.5 ml-2 h-7 flex items-center text-xs text-white whitespace-nowrap pointer-events-none font-medium"
                        style={{ left: (startOffset * CELL_WIDTH) + Math.max(task.duration * CELL_WIDTH, CELL_WIDTH) }}
                     >
                        {task.name}
                     </div>
                  )}
                  
                  {/* Phase Label */}
                  {task.type === 'Phase' && (
                     <div 
                        className="absolute top-0 ml-2 h-full flex items-center text-xs text-white font-bold whitespace-nowrap pointer-events-none uppercase tracking-wide"
                        style={{ left: (startOffset * CELL_WIDTH) + Math.max(task.duration * CELL_WIDTH, CELL_WIDTH) }}
                     >
                        {task.name}
                     </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
