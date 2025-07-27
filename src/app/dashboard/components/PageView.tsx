'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { Page } from '@/types/page';
import RichEditor from '@/app/dashboard/components/RichEditor';

export default function PageView() {
    const supabase = createClientComponentClient();
    const { selectedPage } = useDashboardStore();
    const [page, setPage] = useState<Page>();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchPage = async () => {
            if (!selectedPage) return;
            const { data, error } = await supabase.from('pages').select('*').eq('id', selectedPage).single();
            if (error) console.error(error.message);
            else {
                setPage(data);
                setTitle(data.title || '');
                setContent(data.content || '');
            }
        };

        fetchPage();
    }, [selectedPage, supabase]);

    const handleSave = async () => {
        if (!selectedPage) return;
        setSaving(true);
        const { error } = await supabase
            .from('pages')
            .update({ title, content })
            .eq('id', selectedPage);
        if (error) console.error(error.message);
        else {
            // Optionally, you can update the local state or show a success message

            setSaving(false);
        }
    };

    if (!page) return <p>No page selected</p>;

    return (
        <div className="space-y-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Page title"
            />
            <RichEditor content={content} onChange={setContent} />
            <button onClick={handleSave} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
                {saving ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
}