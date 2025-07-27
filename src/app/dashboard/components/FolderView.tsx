'use client';

import { useDashboardStore } from '@/stores/useDashboardStore';
import { usePages } from '@/hooks/usePages';

export default function FolderView() {
    const { selectedFolder, setSelectedPage } = useDashboardStore();
    const { pages, loading } = usePages(selectedFolder || null);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Pages in this Folder</h2>
            {loading ? (
                <p>Loading pages...</p>
            ) : pages.length === 0 ? (
                <p className="text-gray-500">No pages yet</p>
            ) : (
                <div className="space-y-2">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            onClick={() => setSelectedPage(page.id)}
                            className="p-3 bg-white border rounded shadow hover:bg-gray-50 cursor-pointer"
                        >
                            {page.title || 'Untitled Page'}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}