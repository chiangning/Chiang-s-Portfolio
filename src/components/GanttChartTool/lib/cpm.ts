import { Task, Dependency } from '../types';
import { addDays, differenceInDays, isBefore, isAfter, isWeekend, isSameDay as isSameDayFns, startOfDay, format } from 'date-fns';

// Simplified Holidays (2024-2025)
const HOLIDAYS: Record<'Sydney' | 'Melbourne', string[]> = {
  Sydney: [
    '2024-01-01', '2024-01-26', '2024-03-29', '2024-04-01', '2024-04-25', '2024-06-10', '2024-10-07', '2024-12-25', '2024-12-26',
    '2025-01-01', '2025-01-27', '2025-04-18', '2025-04-21', '2025-04-25', '2025-06-09', '2025-10-06', '2025-12-25', '2025-12-26'
  ],
  Melbourne: [
    '2024-01-01', '2024-01-26', '2024-03-11', '2024-03-29', '2024-04-01', '2024-04-25', '2024-06-10', '2024-09-27', '2024-11-05', '2024-12-25', '2024-12-26',
    '2025-01-01', '2025-01-27', '2025-03-10', '2025-04-18', '2025-04-21', '2025-04-25', '2025-06-09', '2025-09-26', '2025-11-04', '2025-12-25', '2025-12-26'
  ]
};

function isWorkingDay(date: Date, region: 'Standard' | 'Sydney' | 'Melbourne', isWorkingDaysEnabled: boolean): boolean {
  if (!isWorkingDaysEnabled) return true;
  if (isWeekend(date)) return false;
  if (region === 'Standard') return true;
  
  const dateStr = format(date, 'yyyy-MM-dd');
  return !HOLIDAYS[region].includes(dateStr);
}

function addWorkingDays(date: Date, days: number, region: 'Standard' | 'Sydney' | 'Melbourne', isWorkingDaysEnabled: boolean): Date {
  if (!isWorkingDaysEnabled) return addDays(date, days);
  
  let result = new Date(date);
  let added = 0;
  // Handle negative days separately if needed, but usually duration is positive.
  // For negative lag, we might need to subtract.
  const direction = days >= 0 ? 1 : -1;
  const absDays = Math.abs(days);
  
  while (added < absDays) {
    result = addDays(result, direction);
    if (isWorkingDay(result, region, isWorkingDaysEnabled)) {
      added++;
    }
  }
  return result;
}

function getWorkingDaysDiff(start: Date, end: Date, region: 'Standard' | 'Sydney' | 'Melbourne', isWorkingDaysEnabled: boolean): number {
  if (!isWorkingDaysEnabled) return differenceInDays(end, start);
  
  let count = 0;
  let current = new Date(start);
  const isForward = isBefore(start, end);
  
  // Simple iteration (could be optimized)
  while (!isSameDayFns(current, end)) {
    if (isWorkingDay(current, region, isWorkingDaysEnabled)) {
      count++;
    }
    current = addDays(current, isForward ? 1 : -1);
  }
  
  return isForward ? count : -count;
}

/**
 * Performs Critical Path Method (CPM) calculations.
 * Updates Early Start (ES), Early Finish (EF), Late Start (LS), Late Finish (LF),
 * Total Float (TF), and Critical Path status.
 * Also performs rollup for Summary Tasks (Phases).
 */
export function calculateCPM(
  tasks: Task[], 
  projectStartDate: Date, 
  region: 'Standard' | 'Sydney' | 'Melbourne' = 'Standard', 
  isWorkingDaysEnabled: boolean = false
): Task[] {
  // Normalize project start date
  const normalizedProjectStart = startOfDay(projectStartDate);

  // 1. Create a map for quick access
  const taskMap = new Map<string, Task>();
  tasks.forEach(t => taskMap.set(t.id, { 
      ...t,
      startDate: startOfDay(t.startDate),
      endDate: startOfDay(t.endDate)
  }));

  // Identify Leaf Nodes vs Summary Tasks
  const parentIds = new Set<string>();
  tasks.forEach(t => {
    if (t.parentId) parentIds.add(t.parentId);
  });

  // 2. Forward Pass (Calculate ES and EF for Leaf Tasks)
  // We only calculate CPM for tasks that are NOT summary tasks initially.
  // Summary tasks will be calculated via rollup later.
  
  let changed = true;
  let iterations = 0;
  const maxIterations = tasks.length * 2; // Safety break

  // Initialize all leaf tasks to project start if no dependencies
  for (const task of taskMap.values()) {
    if (parentIds.has(task.id)) continue; // Skip summary tasks for now

    if (task.dependencies.length === 0) {
      // Find first working day if project start is non-working
      let start = normalizedProjectStart;
      while (!isWorkingDay(start, region, isWorkingDaysEnabled)) {
        start = addDays(start, 1);
      }
      task.earlyStart = start;
      task.earlyFinish = addWorkingDays(start, task.duration + (task.weatherContingency || 0), region, isWorkingDaysEnabled);
    } else {
      // Reset for calculation
      task.earlyStart = undefined;
      task.earlyFinish = undefined;
    }
  }

  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;

    for (const task of taskMap.values()) {
      if (parentIds.has(task.id)) continue; // Skip summary tasks

      let maxEarlyStart = task.dependencies.length === 0 ? normalizedProjectStart : new Date(0); // Default to project start or epoch

      if (task.dependencies.length > 0) {
        let allPredecessorsCalculated = true;
        
        for (const dep of task.dependencies) {
          const pred = taskMap.get(dep.predecessorId);
          
          if (!pred || !pred.earlyFinish || !pred.earlyStart) {
            allPredecessorsCalculated = false;
            break;
          }

          let possibleStart = new Date(0);
          
          // Logic for different dependency types
          if (dep.type === 'FS') {
            possibleStart = addWorkingDays(pred.earlyFinish, dep.lag, region, isWorkingDaysEnabled);
          }
          else if (dep.type === 'SS') {
            possibleStart = addWorkingDays(pred.earlyStart, dep.lag, region, isWorkingDaysEnabled);
          }
          else if (dep.type === 'FF') {
            const finishConstraint = addWorkingDays(pred.earlyFinish, dep.lag, region, isWorkingDaysEnabled);
            possibleStart = addWorkingDays(finishConstraint, -(task.duration + (task.weatherContingency || 0)), region, isWorkingDaysEnabled);
          }
          else if (dep.type === 'SF') {
             const finishConstraint = addWorkingDays(pred.earlyStart, dep.lag, region, isWorkingDaysEnabled);
             possibleStart = addWorkingDays(finishConstraint, -(task.duration + (task.weatherContingency || 0)), region, isWorkingDaysEnabled);
          }

          // Ensure start is a working day if enabled (unless it's calculated from working days logic already)
          // Actually addWorkingDays handles the jump. But if we land on a weekend due to lag=0 from a finish on Friday?
          // If pred finishes Friday, FS lag 0 -> Start Monday?
          // addWorkingDays(Friday, 0) -> Friday.
          // Wait, FS means Start AFTER Finish. Usually implies +1 day if we treat finish as inclusive end of day?
          // Or is Finish exclusive?
          // Standard: Finish is end of day. Start is start of next day.
          // If Duration is 1 day: Start Mon, Finish Mon.
          // Pred (1d): Mon -> Mon. Succ (FS): Tue -> Tue.
          // Code: addWorkingDays(Mon, 1) -> Tue? No.
          // Let's assume Finish is inclusive.
          // If pred.earlyFinish is Mon (end of day).
          // possibleStart should be Tue (start of day).
          // So we should add 1 day for FS base?
          // Or does addWorkingDays handle duration?
          // Let's stick to: Finish date is the last day of work.
          // So next task starts the NEXT working day.
          // If dep.lag is 0, we want next working day.
          // So we should add 1 + lag?
          // Let's adjust:
          // FS: pred.earlyFinish + 1 working day + lag
          
          // But wait, existing logic was: possibleStart = addDays(pred.earlyFinish, dep.lag);
          // If lag is 0, start = finish. That implies Finish is exclusive (start of next day).
          // Let's stick to existing convention: Finish date is exclusive for calculation purposes?
          // No, usually UI shows inclusive.
          // If UI shows inclusive (Mon-Mon), then Finish is Mon. Next task starts Tue.
          // So FS lag 0 means Start = Finish + 1 day.
          // My previous code: task.earlyFinish = addDays(task.earlyStart, duration)
          // If Start=Mon, Duration=1 -> Finish=Tue.
          // So previous code treated Finish as Exclusive.
          // Let's keep Finish as Exclusive for calculation simplicity, but convert for UI if needed.
          // Actually, let's check UI.
          // width = duration * CELL_WIDTH.
          // If duration 1, width 1 cell.
          // If Start Mon, Finish Tue (exclusive).
          // UI renders from Start to Finish.
          // So visual bar is Mon 00:00 to Tue 00:00 (1 day).
          // This is correct for exclusive finish.
          
          // So, isWorkingDay check:
          // If Finish is Exclusive (Tue 00:00), it might be a non-working day (e.g. Sat 00:00).
          // That's fine.
          // But Start must be a working day?
          // If we land on Sat, we should move to Mon.
          
          if (isWorkingDaysEnabled && !isWorkingDay(possibleStart, region, isWorkingDaysEnabled)) {
             // Move to next working day
             while (!isWorkingDay(possibleStart, region, isWorkingDaysEnabled)) {
               possibleStart = addDays(possibleStart, 1);
             }
          }

          if (isAfter(possibleStart, maxEarlyStart)) {
            maxEarlyStart = possibleStart;
          }
        }

        if (!allPredecessorsCalculated) continue;
      }

      // If we found a new later start date, update
      if (!task.earlyStart || isAfter(maxEarlyStart, task.earlyStart)) {
        task.earlyStart = maxEarlyStart;
        task.earlyFinish = addWorkingDays(maxEarlyStart, task.duration + (task.weatherContingency || 0), region, isWorkingDaysEnabled);
        changed = true;
      }
    }
  }

  // 3. Rollup: Calculate Summary Tasks (Bottom-Up)
  let rollupChanged = true;
  while (rollupChanged) {
    rollupChanged = false;
    for (const parentId of parentIds) {
      const parent = taskMap.get(parentId);
      if (!parent) continue;

      const children = Array.from(taskMap.values()).filter(t => t.parentId === parentId);
      if (children.length === 0) continue;

      // Filter out children that haven't been calculated yet
      const validChildren = children.filter(c => c.earlyStart && c.earlyFinish);
      
      if (validChildren.length > 0) {
        const minStart = validChildren.reduce((min, c) => isBefore(c.earlyStart!, min) ? c.earlyStart! : min, validChildren[0].earlyStart!);
        const maxFinish = validChildren.reduce((max, c) => isAfter(c.earlyFinish!, max) ? c.earlyFinish! : max, validChildren[0].earlyFinish!);
        
        // Check if parent needs update
        if (!parent.earlyStart || !isSameDay(parent.earlyStart, minStart) || !parent.earlyFinish || !isSameDay(parent.earlyFinish, maxFinish)) {
            parent.earlyStart = minStart;
            parent.earlyFinish = maxFinish;
            // Duration for summary is diff between start and finish
            parent.duration = getWorkingDaysDiff(minStart, maxFinish, region, isWorkingDaysEnabled);
            parent.startDate = minStart;
            parent.endDate = maxFinish;
            rollupChanged = true;
        }
      }
    }
  }

  // 4. Backward Pass (Calculate LS, LF, Float)
  // Find the project completion date (max EF of all tasks)
  let projectFinish = normalizedProjectStart;
  for (const task of taskMap.values()) {
    if (task.earlyFinish && isAfter(task.earlyFinish, projectFinish)) {
      projectFinish = task.earlyFinish;
    }
  }

  // Initialize Late dates to Project Finish
  for (const task of taskMap.values()) {
    if (parentIds.has(task.id)) continue; // Skip summary tasks for backward pass initially
    task.lateFinish = projectFinish;
    // LS = LF - Duration
    task.lateStart = addWorkingDays(projectFinish, -(task.duration + (task.weatherContingency || 0)), region, isWorkingDaysEnabled);
  }

  changed = true;
  iterations = 0;

  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;

    for (const task of taskMap.values()) {
      if (parentIds.has(task.id)) continue; // Skip summary tasks

      // Find successors (tasks that depend on this task)
      const successors: { task: Task, dep: Dependency }[] = [];
      for (const other of taskMap.values()) {
        const dep = other.dependencies.find(d => d.predecessorId === task.id);
        if (dep) {
          successors.push({ task: other, dep });
        }
      }

      if (successors.length === 0) {
        continue;
      }

      let minLateFinish = projectFinish;

      for (const { task: succ, dep } of successors) {
        if (!succ.lateStart || !succ.lateFinish) continue;

        let possibleFinish = projectFinish;

        // Reverse logic for backward pass
        if (dep.type === 'FS') {
          // LF = Successor LS - Lag
          possibleFinish = addWorkingDays(succ.lateStart, -dep.lag, region, isWorkingDaysEnabled);
        }
        else if (dep.type === 'SS') {
          const startConstraint = addWorkingDays(succ.lateStart, -dep.lag, region, isWorkingDaysEnabled);
          possibleFinish = addWorkingDays(startConstraint, task.duration + (task.weatherContingency || 0), region, isWorkingDaysEnabled);
        }
        else if (dep.type === 'FF') {
          possibleFinish = addWorkingDays(succ.lateFinish, -dep.lag, region, isWorkingDaysEnabled);
        }
        else if (dep.type === 'SF') {
           const startConstraint = addWorkingDays(succ.lateFinish, -dep.lag, region, isWorkingDaysEnabled);
           possibleFinish = addWorkingDays(startConstraint, task.duration + (task.weatherContingency || 0), region, isWorkingDaysEnabled);
        }

        if (isBefore(possibleFinish, minLateFinish)) {
          minLateFinish = possibleFinish;
        }
      }

      if (!task.lateFinish || isBefore(minLateFinish, task.lateFinish)) {
        task.lateFinish = minLateFinish;
        task.lateStart = addWorkingDays(minLateFinish, -(task.duration + (task.weatherContingency || 0)), region, isWorkingDaysEnabled);
        changed = true;
      }
    }
  }

  // 5. Calculate Float and Critical Path
  for (const task of taskMap.values()) {
    if (parentIds.has(task.id)) {
        const children = Array.from(taskMap.values()).filter(t => t.parentId === task.id);
        task.isCritical = children.some(c => c.isCritical);
        continue;
    }

    if (task.lateStart && task.earlyStart) {
      task.totalFloat = differenceInDays(task.lateStart, task.earlyStart);
      task.isCritical = task.totalFloat <= 0; 
      
      task.startDate = task.earlyStart;
      task.endDate = task.earlyFinish!;
    }
  }

  // Return tasks in the original order (Map preserves insertion order)
  return Array.from(taskMap.values());
}

function isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}

