
"use client"

import { useState } from "react"
import { EditUserModal } from "./EditUserModal"
import { CreateUserModal } from "./CreateUserModal"
import { Search, Plus } from "lucide-react"

interface User {
    id: string
    name: string | null
    email: string
    role: string
    createdAt: Date
}

export function UserManagementList({ users }: { users: User[] }) {
    const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
        OWNER: false,
        ADMIN: false,
        TEACHER: false,
        STUDENT: true // Default Students open
    })
    const [searchTerm, setSearchTerm] = useState("")
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const toggleRole = (role: string) => {
        setExpandedRoles(prev => ({ ...prev, [role]: !prev[role] }))
    }

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const groupedUsers = {
        OWNER: filteredUsers.filter(u => u.role === "OWNER"),
        ADMIN: filteredUsers.filter(u => u.role === "ADMIN"),
        TEACHER: filteredUsers.filter(u => u.role === "TEACHER"),
        STUDENT: filteredUsers.filter(u => u.role === "STUDENT"),
    }

    const roleLabels: Record<string, string> = {
        OWNER: "Donos / Proprietários",
        ADMIN: "Administradores",
        TEACHER: "Professores",
        STUDENT: "Alunos"
    }

    const roleColors: Record<string, string> = {
        OWNER: "text-yellow-400 border-yellow-500/20",
        ADMIN: "text-red-400 border-red-500/20",
        TEACHER: "text-purple-400 border-purple-500/20",
        STUDENT: "text-blue-400 border-blue-500/20"
    }

    return (
        <div>
            {/* Header with Search and Add Button */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar usuários..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="glass-button bg-blue-600 hover:bg-blue-700 whitespace-nowrap flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Novo Usuário
                </button>
            </div>

            <div className="space-y-4">
                {Object.keys(groupedUsers).map((role) => {
                    const roleUsers = groupedUsers[role as keyof typeof groupedUsers]
                    const isExpanded = expandedRoles[role]
                    const count = roleUsers.length

                    if (count === 0 && searchTerm) return null // Hide empty sections during search

                    return (
                        <div key={role} className="glass-card overflow-hidden">
                            <button
                                onClick={() => toggleRole(role)}
                                className={`w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors ${isExpanded ? 'border-b border-white/10' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <h3 className={`font-bold ${roleColors[role].split(" ")[0]}`}>
                                        {roleLabels[role]}
                                    </h3>
                                    <span className="bg-black/40 px-2 py-0.5 rounded-full text-xs text-gray-400">
                                        {count}
                                    </span>
                                </div>
                                <div className={`text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                    ▼
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#121212] text-gray-400 text-xs uppercase tracking-wider">
                                            <tr>
                                                <th className="p-4">Nome</th>
                                                <th className="p-4">Email</th>
                                                <th className="p-4 text-right">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {roleUsers.length === 0 ? (
                                                <tr><td colSpan={3} className="p-6 text-center text-gray-500 text-sm">Nenhum usuário nesta categoria.</td></tr>
                                            ) : (
                                                roleUsers.map((user) => (
                                                    <tr key={user.id} className="text-gray-300 hover:bg-white/5 transition-colors">
                                                        <td className="p-4 font-medium text-white">{user.name}</td>
                                                        <td className="p-4 text-gray-400">{user.email}</td>
                                                        <td className="p-4 text-right">
                                                            <button
                                                                onClick={() => setEditingUser(user)}
                                                                className="text-sm hover:underline text-blue-400"
                                                            >
                                                                Editar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                />
            )}
            {isCreating && (
                <CreateUserModal
                    onClose={() => setIsCreating(false)}
                />
            )}
        </div>
    )
}
