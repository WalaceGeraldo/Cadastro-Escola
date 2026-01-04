
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, LayoutDashboard, User, BookOpen, GraduationCap, Settings, Users } from "lucide-react"
import { signOut } from "next-auth/react"

interface SidebarProps {
    role: "ADMIN" | "OWNER" | "TEACHER" | "STUDENT"
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname()

    const menus = {
        ADMIN: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Alunos", href: "/admin/students", icon: GraduationCap },
            { name: "Usuários", href: "/admin/users", icon: Users },
            { name: "Turmas", href: "/admin/classes", icon: BookOpen },
            { name: "Configurações", href: "/admin/settings", icon: Settings },
        ],
        OWNER: [
            { name: "Visão Geral", href: "/owner", icon: LayoutDashboard },
            { name: "Alunos", href: "/admin/students", icon: GraduationCap },
            { name: "Usuários", href: "/admin/users", icon: Users },
            { name: "Turmas", href: "/admin/classes", icon: BookOpen },
            { name: "Estatísticas", href: "/owner/stats", icon: BookOpen }, // Changing icon to avoid duplicate
        ],
        TEACHER: [
            { name: "Minhas Turmas", href: "/teacher", icon: BookOpen },
        ],
        STUDENT: [
            { name: "Boletim", href: "/student", icon: GraduationCap },
            { name: "Financeiro", href: "/student/financial", icon: BookOpen },
        ],
    }

    const items = menus[role] || []

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 glass-card bg-opacity-10 border-r border-white/10 flex flex-col p-4 m-0 rounded-none z-50">
            <div className="mb-8 px-2">
                <h2 className="text-xl font-bold text-white">Escola Premium</h2>
                <span className="text-xs text-gray-400 capitalize">{role.toLowerCase()} Portal</span>
            </div>

            <nav className="flex-1 space-y-2">
                {items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive
                                ? "bg-primary/20 text-blue-300 border border-white/10"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
            </button>
        </aside>
    )
}
