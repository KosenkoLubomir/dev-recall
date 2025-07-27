// stores/useDashboardStore.ts
import { create } from 'zustand';
import { Folder } from '@/types/folder';
import { Page } from '@/types/page';

type DashboardState = {
    selectedFolder: string | null;
    selectedPage: string | null;
    folders: Folder[];
    creatingForFolder: string | null;
    pagesByFolder: Record<string, Page[]>;
    setFolders: (folders: Folder[]) => void;
    setSelectedFolder: (folderId: string | null) => void;
    setSelectedPage: (pageId: string | null) => void;
    setPagesForFolder: (folderId: string, pages: Page[]) => void;
    setCreatingForFolder: (folderId: string | null) => void;
    addPage: (folderId: string, page: Page) => void;
    toggleFolder: (id: string) => void;
    expandFolder: (id: string) => void;
    expandedFolders: Record<string, boolean>;
};

export const useDashboardStore = create<DashboardState>((set) => ({
    selectedFolder: null,
    selectedPage: null,
    folders: [],
    expandedFolders: {},
    pagesByFolder: {},
    creatingForFolder: null,
    setFolders: (folders) => set({ folders }),
    setSelectedFolder: (folderId) => set({ selectedFolder: folderId }),
    setSelectedPage: (pageId) => set({ selectedPage: pageId }),
    setPagesForFolder: (folderId, pages) =>
        set((state) => ({
            pagesByFolder: {
                ...state.pagesByFolder,
                [folderId]: pages,
            },
        })),
    setCreatingForFolder: (folderId: string | null) =>
        set(() => ({ creatingForFolder: folderId })),
    addPage: (folderId: string, page: Page) =>
        set((state) => {
            const existingPages = state.pagesByFolder[folderId] || [];

            const updatedFolders = state.folders.map((f) =>
                f.id === folderId ? { ...f, pages_count: f.pages_count + 1 } : f
            );

            return {
                pagesByFolder: {
                    ...state.pagesByFolder,
                    [folderId]: [...existingPages, page],
                },
                expandedFolders: {
                    ...state.expandedFolders,
                    [folderId]: true,
                },
                folders: updatedFolders,
            };
        }),
    toggleFolder: (id: string) =>
        set((state) => ({
            expandedFolders: {
                ...state.expandedFolders,
                [id]: !state.expandedFolders[id],
            },
        })),
    expandFolder: (id: string) =>
        set((state) => ({
            expandedFolders: {
                ...state.expandedFolders,
                [id]: true,
            },
        })),
}));