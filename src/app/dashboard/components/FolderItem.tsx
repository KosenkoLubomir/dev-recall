import React from 'react';
import { ChevronDownIcon, ChevronRightIcon, FolderIcon, PlusIcon } from 'lucide-react';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { Folder } from '@/types/folder';
import { usePages } from '@/hooks/usePages'; // ← still needed!

type Props = {
    folder: Folder;
};

export default function FolderItem({ folder }: Props) {
    const { id, name, pages_count } = folder;
    const { setCreatingForFolder } = useDashboardStore();

    const { expandedFolders, toggleFolder } = useDashboardStore();
    const expanded = expandedFolders[folder.id] ?? false;

    const { pages, loading } = usePages(expanded ? folder.id : null);

    return (
        <div>
            <div
                className="flex items-center justify-between text-gray-700 hover:text-blue-600 cursor-pointer"
                onClick={pages_count > 0 ? () => toggleFolder(folder.id) : undefined}
            >
                <div className="flex items-center space-x-2">
                    {pages_count > 0 &&
                        (expanded ? (
                            <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                        ))}
                    <FolderIcon className="w-5 h-5" />
                    <span>{name}</span>
                </div>
                <PlusIcon
                    className="w-4 h-4 text-gray-500 hover:text-blue-600"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCreatingForFolder(id);
                    }}
                />
            </div>

            {expanded && (
                <ul className="pl-8 mt-1 text-sm text-gray-600">
                    {loading ? (
                        <li className="italic text-gray-400">Loading pages...</li>
                    ) : pages.length > 0 ? (
                        pages.map((page) => (
                            <li key={page.id} className="hover:text-blue-600 cursor-pointer">
                                {page.title}
                            </li>
                        ))
                    ) : (
                        <li className="italic text-gray-400">No pages found</li>
                    )}
                </ul>
            )}
        </div>
    );
}