
import { Sidebar } from "@/components/Sidebar"

export default function OwnerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-900">
            <Sidebar role="OWNER" />
            <main className="pl-64 p-8 animate-in fade-in duration-500">
                {children}
            </main>
        </div>
    )
}
