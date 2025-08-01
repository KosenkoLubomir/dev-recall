import Sidebar from '@/app/dashboard/components/Sidebar';
import NewPageModal from '@/app/dashboard/components/NewPageModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="shrink-1 grow max-w-[calc(100vw-256px)]">{children}</main>
            <NewPageModal />
        </div>
    );
}