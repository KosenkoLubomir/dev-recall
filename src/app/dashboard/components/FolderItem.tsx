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
    const { setCreatingForFolder, setSelectedPage, setSelectedFolder, selectedFolder, selectedPage } = useDashboardStore();

    const { expandedFolders, toggleFolder } = useDashboardStore();
    const expanded = expandedFolders[folder.id] ?? false;

    const { pages, loading } = usePages(expanded ? folder.id : null);

    console.log("Selected Folder:", selectedFolder);
    console.log("folder.id:", id);

    const handleFolderClick = () => {
        if (pages_count > 0) {
            toggleFolder(folder.id);
        }
        setSelectedFolder(
            selectedFolder === id ? null : id
        )
    }

    return (
        <div>
            <div
                className={`${selectedFolder === id ? 'text-blue-700' : 'text-gray-700'} flex items-center justify-between hover:text-blue-600 cursor-pointer py-1.5 transition-colors`}
                onClick={handleFolderClick}
            >
                <div className="flex items-center space-x-2">
                    <FolderIcon size={18} />
                    <span>{name}</span>
                    {pages_count > 0 && (expanded ? (
                            <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                        ))}
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
                <ul className="pl-8 text-sm text-gray-600">
                    {loading ? (
                        <li className="italic text-gray-400">Loading pages...</li>
                    ) : pages.length > 0 ? (
                        pages.map((page) => (
                            <li onClick={() => setSelectedPage(page.id)} key={page.id} className={`hover:text-blue-600 mb-2 cursor-pointer ${selectedPage === page.id ? 'text-blue-600 font-semibold' : ''}`}>
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