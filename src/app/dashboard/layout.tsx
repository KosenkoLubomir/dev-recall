import Sidebar from '@/app/dashboard/components/Sidebar';
import NewPageModal from '@/app/dashboard/components/NewPageModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1">{children}</main>
            <NewPageModal />
        </div>
    );
}