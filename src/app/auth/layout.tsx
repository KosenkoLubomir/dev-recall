export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth-wrapper">
            <main className="content">{children}</main>
        </div>
    );
}