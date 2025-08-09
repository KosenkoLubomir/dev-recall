'use client';

import React, {useState, useEffect, useRef} from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useDashboardStore } from '@/stores/useDashboardStore';
import {useUserStore} from "@/stores/useUserStore";
import Button from "@/components/Button";
import {MAX_FOLDERS} from '@/constants/limits';

export default function NewFolderModal() {
    const supabase = createClientComponentClient();

    const {
        setFolders,
        folders,
        creatingFolder,
        setCreatingFolder
    } = useDashboardStore();

    const inputRef = useRef<HTMLInputElement>(null);
    const {user, userPlan} = useUserStore();
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setName('');
        setError('');
        const timeout = setTimeout(() => {
            inputRef.current?.focus();
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    if (!creatingFolder) return null;

    const handleSave = async () => {
        if (!name.trim()) {
            setError('Folder name must be at least 1 character');
            return;
        }

        setSaving(true);

        const { count } = await supabase
            .from('folders')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        if (count && count >= MAX_FOLDERS(userPlan.plan)) {
            return setError("Folder limit reached");
        }

        const { data, error: insertError } = await supabase
            .from('folders')
            .insert({
                name: name.trim(),
                stack_item_id: null,
                user_id: user.id,
                pages_count: 0,
            })
            .select()
            .single();

        setSaving(false);

        if (insertError) {
            console.error(insertError.message);
            setError('Failed to create page');
        } else if (data) {
            setFolders([...folders, data]);
            setName('');
            setError('');
            setCreatingFolder(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4">New Folder</h3>

                <input
                    type="text"
                    placeholder="Enter folder name"
                    className="w-full border px-3 py-2 rounded mb-4 focus:outline-none border-gray-300 focus:border-blue-500"
                    value={name}
                    maxLength={20}
                    autoFocus
                    ref={inputRef}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

                <div className="flex justify-between space-x-2">
                    <Button onClick={() => setCreatingFolder(false)} view={"secondary"} disabled={saving}>Cancel</Button>
                    <Button onClick={handleSave} view={"primary"} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                </div>
            </div>
        </div>
    );
}