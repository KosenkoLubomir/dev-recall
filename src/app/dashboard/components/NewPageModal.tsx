'use client';

import {useState, useEffect, useRef} from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useDashboardStore } from '@/stores/useDashboardStore';
import {useUserStore} from "@/stores/useUserStore";

export default function NewPageModal() {
    const supabase = createClientComponentClient();
    const {
        creatingForFolder,
        setCreatingForFolder,
        addPage,
    } = useDashboardStore();

    const inputRef = useRef<HTMLInputElement>(null);

    const {user} = useUserStore();

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
    }, [creatingForFolder]);

    if (!creatingForFolder) return null;

    const handleSave = async () => {
        if (!name.trim()) {
            setError('Page name must be at least 1 character');
            return;
        }

        setSaving(true);

        const { data, error: insertError } = await supabase
            .from('pages')
            .insert({
                title: name.trim(),
                folder_id: creatingForFolder,
                user_id: user.id,
            })
            .select()
            .single();

        if (insertError) {
            console.error(insertError.message);
            setError('Failed to create page');
        } else if (data) {
            addPage(creatingForFolder, data);
            setCreatingForFolder(null);
        }

        setSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">New Page</h3>

                <input
                    type="text"
                    placeholder="Enter page name"
                    className="w-full border px-3 py-2 rounded mb-2 focus:outline-none focus:ring"
                    value={name}
                    ref={inputRef}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setCreatingForFolder(null)}
                        className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        disabled={saving}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}