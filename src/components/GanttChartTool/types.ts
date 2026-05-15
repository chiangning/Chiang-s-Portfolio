export type DependencyType = 'FS' | 'SS' | 'FF' | 'SF';

export type ViewMode = 'Day' | 'Week' | 'Month';

export interface Dependency {
  predecessorId: string;
  type: DependencyType;
  lag: number; // in days
}

export interface Task {
  id: string;
  wbs: string;
  name: string;
  duration: number; // in days
  startDate: Date;
  endDate: Date;
  
  // CPM Calculated Fields
  earlyStart?: Date;
  earlyFinish?: Date;
  lateStart?: Date;
  lateFinish?: Date;
  totalFloat?: number;
  isCritical?: boolean;

  // User Input / Configuration
  dependencies: Dependency[];
  progress: number;
  type: 'Task' | 'Milestone' | 'Phase';
  isExpanded?: boolean; // For phases
  parentId?: string; // For hierarchy
  
  // Construction Specifics
  assignee?: string;
  weatherContingency?: number; // Extra days buffer
  notes?: string;
}

export interface TradeCost {
  id: string;
  tradeName: string;
  projectedCost: number;
  actualCost: number;
}

export interface ProjectMetadata {
  name: string;
  number: string;
  author: string;
  description: string;
  address: string;
  floorArea: number;
  updatedAt: Date;
}

export interface ProjectSettings {
  startDate: Date;
  showCriticalPath: boolean;
  showDependencies: boolean;
  viewMode: ViewMode;
  calendarMode: 'Standard' | 'Sydney' | 'Melbourne';
  isWorkingDays: boolean;
}
