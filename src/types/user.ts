import {StackItem} from "@/types/stack_item";

export type User = {
    id: string;
    email: string;
    name: string;
    role: string;
    level: string;
    stack_items: StackItem[]; // array of stack_item IDs
    visibility: 'public' | 'private';
}