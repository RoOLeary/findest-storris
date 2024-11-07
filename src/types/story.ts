export interface Story {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority?: string; 
    author: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any;
    capability?: string, 
    role?: string,
    benefit?: string
}