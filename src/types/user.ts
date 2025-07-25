export type User = {
    id: string;
    email: string;
    name: string;
    role: string;
    level: string;
    stack_items: string[]; // array of stack_item IDs
    visibility: 'public' | 'private';
}