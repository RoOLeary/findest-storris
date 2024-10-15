export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority?: string; 
    author: string;
}