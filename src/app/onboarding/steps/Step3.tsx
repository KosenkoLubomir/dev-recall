'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import {useUserStore} from "@/stores/useUserStore";
import Button from "@/components/Button";

export default function Step3() {
    const supabase = createClientComponentClient();

    const {
        user,
        setVisibility } = useUserStore();

    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleSelect = async (value: 'public' | 'private') => {
        setVisibility(value);
    };

    const handleFinish = async () => {
        setSaving(true);

        const { error: visibilityError } = await supabase
            .from('users')
            .update({ visibility: user.visibility })
            .eq('id', user.id);

        if (visibilityError) {
            console.error('Failed to save visibility:', visibilityError.message);
            setSaving(false);
            return;
        }

        const foldersToInsert = user.stack_items.map((stackItem) => ({
            user_id: user.id,
            stack_item_id: stackItem.id,
            name: stackItem.name,
        }));

        const { error: folderInsertError } = await supabase
            .from('folders')
            .insert(foldersToInsert);

        if (folderInsertError) {
            console.error('Failed to insert folders:', folderInsertError.message);
        } else {
            router.push('/dashboard');
        }

        setSaving(false);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Step 3: Profile Visibility</h2>
            <p className="mb-4 text-sm text-gray-600">
                Select whether your profile should be publicly visible or private.
            </p>

            <div className="flex gap-4 mb-4">
                <Button onClick={() => handleSelect('public')} view={user.visibility === "public" ? "primary" : "secondary"} disabled={saving || user?.stack_items?.length === 0}>Public</Button>
                <Button onClick={() => handleSelect('private')} view={user.visibility === "private" ? "primary" : "secondary"} disabled={saving || user?.stack_items?.length === 0}>Private</Button>
            </div>

            <Button onClick={handleFinish} view={"success"} disabled={saving}>{saving ? 'Saving...' : 'Finish'}</Button>
        </div>
    );
}