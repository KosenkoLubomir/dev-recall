'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { Page } from '@/types/page';
import RichEditor from '@/app/dashboard/components/RichEditor';
import { JSONContent } from '@tiptap/react';

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

    if (!page) return <p>No page selected</p>;
    if (!content) return <p>Loading content…</p>;

    return (
        <div className="space-y-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Page title"
            />
            {!loading && (
                <RichEditor key={selectedPage} content={content} onChange={setContent} />
            )}
            <button onClick={handleSave} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
                {saving ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
}