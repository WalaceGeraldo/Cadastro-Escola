
import { prisma } from "@/lib/prisma"
import { createStudent } from "@/app/actions/school" // Fixed import path
import { UserPlus } from "lucide-react"

export default async function AdminStudentsPage() {
    const students = await prisma.user.findMany({
        where: { role: "STUDENT" },
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Gerenciar Alunos</h1>
                <p className="text-gray-400">Cadastre novos alunos e visualize os existentes</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="glass-card p-6 sticky top-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-blue-400" />
                            Novo Aluno
                        </h2>
                        <form action={createStudent} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: João Silva"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="joao@escola.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Senha Inicial</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="******"
                                />
                            </div>
                            <button type="submit" className="w-full glass-button bg-blue-600 hover:bg-blue-700 mt-4">
                                Cadastrar Aluno
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-300">
                                <tr>
                                    <th className="p-4">Nome</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Data Cadastro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-gray-500">Nenhum aluno cadastrado.</td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr key={student.id} className="text-gray-300 hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-medium text-white">{student.name}</td>
                                            <td className="p-4 text-gray-400">{student.email}</td>
                                            <td className="p-4 text-sm text-gray-500">
                                                {new Date(student.createdAt).toLocaleDateString('pt-BR')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
