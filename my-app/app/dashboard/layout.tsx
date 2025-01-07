"use client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="dashboard-layout">
            <nav className="p-4 bg-gray-200">
                <a href="/">Home</a> | <a href="/dashboard">Dashboard</a>
            </nav>
            <main>{children}</main>
            <style jsx>{`
                .dashboard-layout {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
            `}</style>
        </div>
    );
}