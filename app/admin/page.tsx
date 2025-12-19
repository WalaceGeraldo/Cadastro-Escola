
import { prisma } from "@/lib/prisma"
import { Users, GraduationCap, BookOpen } from "lucide-react"

async function getStats() {
    const [userCount, studentCount, teacherCount] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: 'STUDENT' } }),
        prisma.user.count({ where: { role: 'TEACHER' } }),
    ])
    return { userCount, studentCount, teacherCount }
}

export default async function AdminDashboard() {
    const stats = await getStats()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Painel do Administrador</h1>
                <p className="text-gray-400">Visão geral do sistema</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                        <Users className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Total de Usuários</p>
                        <h3 className="text-2xl font-bold text-white">{stats.userCount}</h3>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center space-x-4">
                    <div className="p-3 bg-purple-500/20 rounded-full">
                        <GraduationCap className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Alunos</p>
                        <h3 className="text-2xl font-bold text-white">{stats.studentCount}</h3>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center space-x-4">
                    <div className="p-3 bg-green-500/20 rounded-full">
                        <BookOpen className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Professores</p>
                        <h3 className="text-2xl font-bold text-white">{stats.teacherCount}</h3>
                    </div>
                </div>
            </div>

            {/* Placeholder for recent activity or user list */}
            <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">Ações Rápidas</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <button className="glass-button w-full">Adicionar Novo Usuário</button>
                    <button className="glass-button w-full bg-white/5 hover:bg-white/10">Gerenciar Turmas</button>
                </div>
            </div>
        </div>
    )
}
