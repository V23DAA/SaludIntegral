export interface Activity {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: 'meditation' | 'exercise' | 'breathing' | 'mindfulness';
  completed: boolean;
}
