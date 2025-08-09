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

export type UserPlan = {
    plan: 'free' | 'pro' | 'admin';
    status: string;
    start_date: string;
    updated_at: string;
    current_period_end: string;
    payment_system_id: string | null; // e.g., Stripe subscription ID
}