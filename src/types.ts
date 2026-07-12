export type ActivityType = 'select-one' | 'select-multi' | 'order' | 'tap-counter';

export interface ActivityOption {
  text: string;
  feedback: string;
}

export interface OrderItem {
  text: string;
  order: number;
}

export interface Activity {
  type: ActivityType;
  label: string;
  prompt: string;
  options?: ActivityOption[];
  multiOptions?: string[];
  orderItems?: OrderItem[];
  targetCount?: number;
  icon?: string;
  confirmLabel?: string;
}

export interface TravelStop {
  id: number;
  place: string;
  icon: string;
  title: string;
  virtue: string;
  text: string;
  stamp: string;
  grad: string;
  activity: Activity;
}

export interface UserProgress {
  currentStopIndex: number;
  completedStops: number[];
  activitiesSolved: { [stopId: number]: boolean };
}
