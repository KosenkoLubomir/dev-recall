'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useUserStore } from '@/stores/useUserStore';

export default function FoldersList() {
    const supabase = createClientComponentClient();
    const { setFolders, folders, setSelectedFolder } = useDashboardStore();
    const { user } = useUserStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {

            if (user && !folders?.length) {
                const { data: folderData } = await supabase
                    .from('folders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                setFolders(folderData || []);
            }
            setLoading(false);
        };

        fetchData();
    }, [supabase, folders, user, setFolders]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Welcome{user.name ? `, ${user.email}` : ''}</h1>
            <p className="text-gray-600 mb-6">Your personalized interview prep space</p>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Folders</h2>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : folders.length === 0 ? (
                <p className="text-gray-500">No folders yet. Start by creating one!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {folders.map((folder) => (
                        <div
                            key={folder.id}
                            onClick={() => setSelectedFolder(folder.id)}
                            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
                        >
                            <h3 className="font-medium text-lg">{folder.name}</h3>
                            <p className="text-sm text-gray-400">
                                Created: {new Date(folder.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}