'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
    LogOutIcon,
    SettingsIcon,
    ChevronDownIcon, Globe, TvMinimalPlay, Newspaper,
} from 'lucide-react';
import {useDashboardStore} from "@/stores/useDashboardStore";
import FolderItem from './FolderItem';
import Logo from "@/components/Logo";

export default function Sidebar() {
    const { user, reset } = useUserStore();
    const { folders } = useDashboardStore();
    const supabase = createClientComponentClient();
    const router = useRouter();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        reset();
        router.push('/auth/login');
    };

    return (
        <aside className="w-64 h-screen flex flex-col justify-between grow-0 shrink-0 bg-gray-100 border-r border-gray-200 p-4">
            <div className={"mb-4 shrink-0 pb-4 border-b border-gray-300 mt-[1px]"}>
                <Logo view={"horizontal"} />
            </div>

            <div className={"flex shrink-1 flex-col justify-start grow overflow-auto"}>
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold mb-0">Your Stack</h2>
                        <button className="text-blue-500 text-sm cursor-pointer px-2 py-1 rounded-md hover:bg-blue-100">
                            + New Folder
                        </button>
                    </div>
                    {!folders ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                    ) : folders.length > 0 ? (
                        <nav>
                            {folders.map((folder) => (
                                <FolderItem
                                    key={folder.id}
                                    folder={folder}
                                />
                            ))}
                        </nav>
                    ) : (
                        <p className="text-sm text-gray-500">No stack items selected</p>
                    )}
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Bookmarks</h2>
                    <ul className={"flex flex-col items-start"} >
                        <li className={"inline-flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer py-1.5 transition-colors"}>
                            <Globe size={18}/> <span>Web-resources</span>
                        </li>
                        <li className={"inline-flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer py-1.5 transition-colors"}>
                            <TvMinimalPlay size={18}/> <span>Videos</span>
                        </li>
                        <li className={"inline-flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer py-1.5 transition-colors"}>
                            <Newspaper size={18}/> <span>Articles</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="relative shrink-0 border-t z-10 border-gray-300 pt-4 mt-4">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between text-left bg-white px-3 py-2 cursor-pointer rounded border border-gray-300 hover:bg-gray-50"
                >
                    <span className="font-medium text-gray-800">{user?.name || 'User'}</span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>

                {dropdownOpen && (
                    <>
                        <div className="absolute z-10 w-full mt-1 left-0 right-0 bottom-3/4 bg-white border border-gray-200 rounded shadow">
                            <button
                                onClick={() => router.push('/settings')}
                                className="w-full flex cursor-pointer items-center px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                            >
                                <SettingsIcon className="w-4 h-4 mr-2" />
                                Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex cursor-pointer items-center px-4 py-3 text-sm font-semibold text-red-600 hover:bg-gray-100"
                            >
                                <LogOutIcon className="w-4 h-4 mr-2" />
                                Log Out
                            </button>
                        </div>

                        <div className={"fixed left-0 top-0 w-full h-full"} onClick={() => setDropdownOpen(false)}></div>
                    </>
                )}
            </div>
        </aside>
    );
}