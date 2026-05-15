import React, { useMemo } from 'react';
import { Task, Dependency } from '../../types';
import { differenceInDays, addDays } from 'date-fns';

interface DependencyLinesProps {
  tasks: Task[];
  startDate: Date;
  cellWidth: number;
  rowHeight: number;
  headerHeight: number;
  highlightedTasks?: Set<string>;
}

export const DependencyLines: React.FC<DependencyLinesProps> = ({
  tasks,
  startDate,
  cellWidth,
  rowHeight,
  headerHeight,
  highlightedTasks = new Set(),
}) => {
  const lines = useMemo(() => {
    const paths: React.ReactNode[] = [];

    // Create a map for quick lookup of task positions
    const taskMap = new Map<string, { x: number, y: number, width: number, height: number }>();
    
    tasks.forEach((task, index) => {
      const x = differenceInDays(task.startDate, startDate) * cellWidth;
      const y = index * rowHeight + headerHeight + (rowHeight / 2);
      const width = task.duration * cellWidth;
      taskMap.set(task.id, { x, y, width, height: rowHeight });
    });

    tasks.forEach((task) => {
      task.dependencies.forEach((dep) => {
        const predecessor = taskMap.get(dep.predecessorId);
        const current = taskMap.get(task.id);

        if (!predecessor || !current) return;

        // Check if this dependency is part of the highlighted chain
        // A dependency is highlighted if BOTH the task and its predecessor are in the highlighted set
        const isHighlighted = highlightedTasks.has(task.id) && highlightedTasks.has(dep.predecessorId);

        let startX = 0, startY = 0, endX = 0, endY = 0;

        // Calculate start and end points based on dependency type
        // FS: Predecessor End -> Current Start
        if (dep.type === 'FS') {
          startX = predecessor.x + predecessor.width;
          startY = predecessor.y;
          endX = current.x;
          endY = current.y;
        }
        // SS: Predecessor Start -> Current Start
        else if (dep.type === 'SS') {
          startX = predecessor.x;
          startY = predecessor.y;
          endX = current.x;
          endY = current.y;
        }
        // FF: Predecessor End -> Current End
        else if (dep.type === 'FF') {
          startX = predecessor.x + predecessor.width;
          startY = predecessor.y;
          endX = current.x + current.width;
          endY = current.y;
        }
        // SF: Predecessor Start -> Current End
        else if (dep.type === 'SF') {
          startX = predecessor.x;
          startY = predecessor.y;
          endX = current.x + current.width;
          endY = current.y;
        }

        // Generate SVG Path
        // Improved orthogonal routing
        const gap = 20; // Minimum gap for routing
        const cornerRadius = 4;
        
        let d = '';

        // Helper for drawing rounded corners
        // M x1 y1 L x2 y2 ...
        
        // Determine exit and entry points based on type
        // FS: Exit Right, Enter Left
        // SS: Exit Left, Enter Left
        // FF: Exit Right, Enter Right
        // SF: Exit Left, Enter Right

        const isExitRight = dep.type === 'FS' || dep.type === 'FF';
        const isEnterRight = dep.type === 'FF' || dep.type === 'SF';

        // Adjust start/end X slightly to not overlap with bar edge exactly
        // const sx = isExitRight ? startX : startX; 
        // const ex = isEnterRight ? endX : endX;

        // Simple routing logic:
        // 1. Move horizontally from start
        // 2. Move vertically to target row
        // 3. Move horizontally to target

        if (dep.type === 'FS') {
            // Standard: Right -> Left
            if (endX > startX + gap) {
                // Direct forward
                const midX = (startX + endX) / 2;
                d = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
            } else {
                // Loop back
                const midY = (startY + endY) / 2;
                const loopX = Math.max(startX, endX) + gap; // Go around right side? No, usually go down/up then left
                // Better loop for FS overlap:
                // Right -> Down -> Left -> Down -> Right
                // Or simply: Right -> Down -> Left -> Right
                
                const r1 = startX + 10;
                const l1 = endX - 10;
                const midY1 = startY + (endY > startY ? rowHeight/2 + 5 : -rowHeight/2 - 5);
                
                d = `M ${startX} ${startY} 
                     L ${r1} ${startY} 
                     L ${r1} ${midY1} 
                     L ${l1} ${midY1} 
                     L ${l1} ${endY} 
                     L ${endX} ${endY}`;
            }
        } else if (dep.type === 'SS') {
            // Left -> Left
            // Go left from start, down/up, right to end
            const l1 = Math.min(startX, endX) - 10;
            d = `M ${startX} ${startY} L ${l1} ${startY} L ${l1} ${endY} L ${endX} ${endY}`;
        } else if (dep.type === 'FF') {
            // Right -> Right
            // Go right from start, down/up, left to end
            const r1 = Math.max(startX, endX) + 10;
            d = `M ${startX} ${startY} L ${r1} ${startY} L ${r1} ${endY} L ${endX} ${endY}`;
        } else if (dep.type === 'SF') {
            // Left -> Right
            // Go left from start, down/up, right to end
            // Actually this is tricky. Left of Pred to Right of Succ.
            // Go Left -> Down -> Right -> Right
            const l1 = startX - 10;
            const r1 = endX + 10;
             // If Succ is to the right of Pred start, we can just go down and right
            if (endX > startX) {
                 d = `M ${startX} ${startY} L ${l1} ${startY} L ${l1} ${endY} L ${endX} ${endY}`;
            } else {
                // Loop around
                 d = `M ${startX} ${startY} L ${l1} ${startY} L ${l1} ${endY} L ${endX} ${endY}`;
            }
        }

        // Determine stroke color and width
        let stroke = "#D6D9DD"; // default secondary
        let strokeWidth = 1.5;
        let marker = "url(#arrowhead)";

        if (isHighlighted) {
            stroke = "#FF7F50"; // primary
            strokeWidth = 2.5;
            marker = "url(#arrowhead-highlighted)";
        } else if (task.isCritical) {
            stroke = "#FF7F50"; // primary
            strokeWidth = 2;
            marker = "url(#arrowhead-critical)";
        }

        paths.push(
          <path
            key={`${task.id}-${dep.predecessorId}`}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            markerEnd={marker}
            className="transition-all duration-300"
            style={{ opacity: highlightedTasks.size > 0 && !isHighlighted ? 0.3 : 1 }}
          />
        );
      });
    });

    return paths;
  }, [tasks, startDate, cellWidth, rowHeight, headerHeight, highlightedTasks]);

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#D6D9DD" />
        </marker>
        <marker id="arrowhead-critical" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#FF7F50" />
        </marker>
        <marker id="arrowhead-highlighted" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#FF7F50" />
        </marker>
      </defs>
      {lines}
    </svg>
  );
};
