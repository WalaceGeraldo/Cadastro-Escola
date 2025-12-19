
import { prisma } from "@/lib/prisma"

export default async function AdminClassesPage() {
    const classes = await prisma.class.findMany({
        include: { teacher: true, _count: { select: { enrollments: true } } }
    })

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Gerenciar Turmas</h1>
                    <p className="text-gray-400">Visualize e crie novas turmas</p>
                </div>
                <button className="glass-button">
                    + Nova Turma
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-300">
                        <tr>
                            <th className="p-4">Nome da Turma</th>
                            <th className="p-4">Professor</th>
                            <th className="p-4">Alunos</th>
                            <th className="p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {classes.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    Nenhuma turma cadastrada.
                                </td>
                            </tr>
                        ) : (
                            classes.map((cls) => (
                                <tr key={cls.id} className="text-gray-300 hover:bg-white/5 transition-colors">
                                    <td className="p-4">{cls.name}</td>
                                    <td className="p-4">{cls.teacher?.name || "Sem professor"}</td>
                                    <td className="p-4">{cls._count.enrollments}</td>
                                    <td className="p-4 text-blue-400 hover:underline cursor-pointer">
                                        Editar
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
