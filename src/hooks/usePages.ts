// hooks/usePages.ts
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Page } from '@/types/page';
import { useDashboardStore } from '@/stores/useDashboardStore';

export function usePages(folderId: string | null): { pages: Page[]; loading: boolean } {
    const supabase = createClientComponentClient();
    const { pagesByFolder, setPagesForFolder } = useDashboardStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPages = async () => {
            if (!folderId || pagesByFolder[folderId]) return;

            setLoading(true);
            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .eq('folder_id', folderId)
                .order('created_at', { ascending: false });

            if (error) console.error(error.message);
            if (data) setPagesForFolder(folderId, data);
            setLoading(false);
        };

        fetchPages();
    }, [folderId, supabase, pagesByFolder, setPagesForFolder]);

    const pages = folderId ? pagesByFolder[folderId] || [] : [];

    return { pages, loading };
}