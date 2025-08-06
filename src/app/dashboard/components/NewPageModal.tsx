'use client';

import React, {useState, useEffect, useRef} from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useDashboardStore } from '@/stores/useDashboardStore';
import {useUserStore} from "@/stores/useUserStore";
import Button from "@/components/Button";
import { JSONContent } from '@tiptap/react';

export default function NewPageModal() {
    const supabase = createClientComponentClient();
    const {
        creatingForFolder,
        setCreatingForFolder,
        setSelectedPage,
        selectedFolder,
        folders,
        addPage,
    } = useDashboardStore();

    const inputRef = useRef<HTMLInputElement>(null);

    const {user} = useUserStore();

    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);
    const [generating, setGenerating] = useState(false);
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

    const handleSave = async (content?: JSONContent | null) => {
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
                content: content || { type: 'doc', content: [] }, // Default empty content
            })
            .select()
            .single();

        if (insertError) {
            console.error(insertError.message);
            setError('Failed to create page');
        } else if (data) {
            addPage(creatingForFolder, data);
            setCreatingForFolder(null);
            setSelectedPage(data.id);
        }

        setSaving(false);
    };

    const handleAIGeneration = async () => {
        if (!name.trim()) {
            setError('Page name must be at least 1 character');
            return;
        }
        setGenerating(true);
        const response = await fetch('/api/generate-page', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                folderName: folders.find(f => f.id === selectedFolder)?.name || '',
                pageName: name.trim(),
            }),
        });

        const aiData = await response.json();
        setGenerating(false);

        if (!response.ok) {
            console.error('AI generation failed:', aiData.error);
            setError('Failed to generate content');
            return;
        }

        await handleSave(aiData.content);
    }

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4">New Page</h3>

                <input
                    type="text"
                    placeholder="Enter page name"
                    className="w-full border px-3 py-2 rounded mb-4 focus:outline-none border-gray-300 focus:border-blue-500"
                    value={name}
                    maxLength={20}
                    autoFocus
                    ref={inputRef}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

                <div className="flex justify-between space-x-2">
                    <Button onClick={() => setCreatingForFolder(null)} view={"secondary"} disabled={saving}>Cancel</Button>
                    <div className={"flex items-center gap-2"}>
                        <Button onClick={() => handleSave()} view={"primary"} disabled={generating || saving}>{saving ? 'Saving...' : 'Save as Blank'}</Button>
                        <Button onClick={handleAIGeneration} view={"primary"} disabled={generating || saving}>{saving || generating ? 'Generating...' : 'Generate by AI'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}