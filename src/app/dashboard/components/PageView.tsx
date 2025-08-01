'use client';

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { Page } from '@/types/page';
import RichEditor from '@/app/dashboard/components/RichEditor';
import { JSONContent } from '@tiptap/react';
import Button from "@/components/Button";

export default function PageView() {
    const supabase = createClientComponentClient();
    const { selectedPage } = useDashboardStore();
    const [page, setPage] = useState<Page>();

    const [title, setTitle] = useState('');

    const [content, setContent] = useState<JSONContent>({
        type: 'doc',
        content: [],
    });
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            if (!selectedPage) return;

            setLoading(true);

            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .eq('id', selectedPage)
                .single();

            if (error) {
                console.error(error.message);
                setLoading(false);
                return;
            }

            setPage(data);
            setTitle(data.title || '');
            try {
                const parsed = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
                setContent(parsed);
            } catch (e) {
                console.error('Failed to parse content:', e);
                setContent({ type: 'doc', content: [] });
            }

            setLoading(false);
        };

        fetchPage();
    }, [selectedPage, supabase]);

    const handleSave = async () => {
        if (!selectedPage) return;
        setSaving(true);
        const { error } = await supabase.from('pages')
            .update({
                title,
                content: JSON.stringify(content), // Ensure it's saved as string
            })
            .eq('id', selectedPage);
        if (error) console.error(error.message);
        else {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedPage) return;
        setSaving(true);
        const { error } = await supabase.from('pages')
            .delete()
            .eq('id', selectedPage);
        if (error) console.error(error.message);
        else {
            setSaving(false);
            // Optionally, you can reset the page state or redirect
            setPage(undefined);
        }
    };

    if (!page) return <p>No page selected</p>;

    return (
        <div className="space-y-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-b-1 text-xl font-semibold border-x-0 border-t-0 border-gray-300 rounded-none pl-0 pr-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Page title"
            />

            {loading && <div className="flex items-center justify-center h-[calc(100vh-168px)] text-gray-500">Loading page...</div>}
            {!loading && (
                <RichEditor key={selectedPage} content={content} onChange={setContent} />
            )}

            <div className={"flex items-center justify-between pt-4 border-t-1 border-gray-200"}>
                <Button onClick={handleSave} view={"primary"} disabled={loading}>{saving ? 'Saving...' : 'Save'}</Button>
                <Button onClick={handleDelete} view={"danger"} disabled={loading}>{saving ? 'Deleting...' : 'Delete Page'}</Button>
            </div>
        </div>
    );
}