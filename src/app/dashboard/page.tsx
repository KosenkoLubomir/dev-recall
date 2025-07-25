'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Folder = {
    id: string;
    name: string;
    created_at: string;
};

export default function DashboardPage() {
    const supabase = createClientComponentClient();
    const [folders, setFolders] = useState<Folder[]>([]);
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                setUserEmail(user.email || '');

                const { data, error } = await supabase
                    .from('folders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (data) setFolders(data);
                if (error) console.error(error.message);
            }

            setLoading(false);
        };

        fetchData();
    }, [supabase]);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-2">Welcome{userEmail ? `, ${userEmail}` : ''}</h1>
                <p className="text-gray-600 mb-6">Your personalized interview prep space</p>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">My Folders</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        + New Folder
                    </button>
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
        </div>
    );
}