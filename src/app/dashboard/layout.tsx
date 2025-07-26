'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { FolderIcon, LogOutIcon, SettingsIcon, ChevronDownIcon } from 'lucide-react';

type StackItem = {
    id: string;
    name: string;
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, reset } = useUserStore();
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [stackDetails, setStackDetails] = useState<StackItem[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStackDetails = async () => {
            console.log("user", user);
            setLoading(true);
            if (!user?.stack_items?.length) {
                setStackDetails([]);
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('stack_items')
                .select('id, name')
                .in('id', user.stack_items);

            if (error) {
                console.error('Failed to load stack items:', error.message);
                setStackDetails([]);
            } else {
                setStackDetails(data || []);
            }

            setLoading(false);
        };

        fetchStackDetails();
    }, [user, supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        reset(); // reset Zustand user state
        router.push('/auth/login');
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 border-r border-gray-200 p-4 hidden md:block">
                {/* User Header */}
                <div className="relative mb-6">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between text-left bg-white px-3 py-2 rounded border border-gray-300 shadow-sm hover:bg-gray-50"
                    >
                        <span className="font-medium text-gray-800">{user?.name || 'User'}</span>
                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow">
                            <button
                                onClick={() => router.push('/settings')}
                                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <SettingsIcon className="w-4 h-4 mr-2" />
                                Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                <LogOutIcon className="w-4 h-4 mr-2" />
                                Log Out
                            </button>
                        </div>
                    )}
                </div>

                {/* Stack section */}
                <h2 className="text-lg font-semibold mb-4">Your Stack</h2>
                {loading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                ) : stackDetails.length > 0 ? (
                    <nav className="space-y-2">
                        {stackDetails.map(({ id, name }) => (
                            <div
                                key={id}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                            >
                                <FolderIcon className="w-5 h-5" />
                                <span>{name}</span>
                            </div>
                        ))}
                    </nav>
                ) : (
                    <p className="text-sm text-gray-500">No stack items selected</p>
                )}
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-white">{children}</main>
        </div>
    );
}