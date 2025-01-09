"use client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="dashboard-layout">
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