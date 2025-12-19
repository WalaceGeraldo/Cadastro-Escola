
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export default async function StudentDashboard() {
    const session = await getServerSession(authOptions)
    // Similar logic to teacher, fetch enrollments/grades
    const grades = await prisma.grade.findMany({
        where: { studentId: session?.user?.id },
        include: { class: true }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Portal do Aluno</h1>
                <p className="text-gray-400">Acompanhe seu desempenho acadêmico</p>
            </div>

            {grades.length === 0 ? (
                <div className="glass-card p-12 text-center text-gray-400">
                    <p>Nenhuma nota lançada ainda.</p>
                </div>
            ) : (
                <div className="glass-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="p-4">Matéria</th>
                                <th className="p-4">Descrição</th>
                                <th className="p-4">Nota</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {grades.map(grade => (
                                <tr key={grade.id} className="text-gray-300 hover:bg-white/5">
                                    <td className="p-4">{grade.class.name}</td>
                                    <td className="p-4">{grade.description}</td>
                                    <td className="p-4 font-bold text-white">{grade.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
