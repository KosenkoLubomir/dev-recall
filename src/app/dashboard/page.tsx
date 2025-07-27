'use client';
import { useDashboardStore } from '@/stores/useDashboardStore';
import FoldersList from './components/FoldersList';
import FolderView from './components/FolderView';
import PageView from './components/PageView';

export default function DashboardPage() {
    const { selectedFolder, selectedPage } = useDashboardStore();
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            {selectedPage ? (
                <PageView />
            ) : selectedFolder ? (
                <FolderView />
            ) : (
                <FoldersList />
            )}
        </div>
    );
}