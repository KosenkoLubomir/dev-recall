export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="dashboard-wrapper">
            <aside className="sidebar">Sidebar here</aside>
            <main className="content">{children}</main>
        </div>
    );
}