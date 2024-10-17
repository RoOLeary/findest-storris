export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority?: string; 
    author: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any;
}