
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { enrollStudent, updateGrade } from "@/app/actions/school"
import { Search, UserPlus, Save } from "lucide-react"
import { revalidatePath } from "next/cache"
import { EnrollStudentForm } from "@/components/EnrollStudentForm"

export default async function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const classId = resolvedParams.id

    const classData = await prisma.class.findUnique({
        where: { id: classId },
        include: {
            enrollments: {
                include: {
                    student: true
                }
            },
            grades: true // Fetch all grades for this class to map manually
        }
    })

    if (!classData) return notFound()

    // Helper fetch all students for "Add Student" dropdown (simple approach for now)
    const allStudents = await prisma.user.findMany({
        where: { role: "STUDENT" },
        select: { id: true, name: true, email: true }
    })

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-sm font-bold text-purple-400 tracking-wider">TURMA</span>
                    <h1 className="text-3xl font-bold text-white mt-1">{classData.name}</h1>
                    <p className="text-gray-400">Gerenciar alunos e notas</p>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-lg text-sm text-gray-300">
                    Total de Alunos: {classData.enrollments.length}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content: Student List & Grades */}
                <div className="lg:col-span-2 glass-card overflow-hidden">
                    <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-white">Diário de Classe</h3>
                    </div>

                    <table className="w-full text-left">
                        <thead className="bg-black/20 text-gray-400 text-sm">
                            <tr>
                                <th className="p-4">Aluno</th>
                                <th className="p-4 w-32">Nota Atual</th>
                                <th className="p-4 w-32">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {classData.enrollments.length === 0 ? (
                                <tr><td colSpan={3} className="p-8 text-center text-gray-500">Nenhum aluno matriculado nesta turma.</td></tr>
                            ) : (
                                classData.enrollments.map((enrollment) => {
                                    // Find grade for this student in the class grades list
                                    const grade = classData.grades.find(g => g.studentId === enrollment.student.id)
                                    const currentGrade = grade?.value || 0

                                    return (
                                        <tr key={enrollment.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium text-white">{enrollment.student.name}</div>
                                                <div className="text-xs text-gray-500">{enrollment.student.email}</div>
                                            </td>
                                            <td className="p-4">
                                                <form action={async (formData) => {
                                                    "use server"
                                                    const value = parseFloat(formData.get("value") as string)
                                                    await updateGrade(classId, enrollment.student.id, value)
                                                }} className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        name="value"
                                                        step="0.1"
                                                        min="0"
                                                        max="10"
                                                        defaultValue={currentGrade}
                                                        className="w-20 bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-center focus:outline-none focus:border-purple-500"
                                                    />
                                                    <button type="submit" className="p-2 text-purple-400 hover:text-purple-300 hover:bg-white/10 rounded">
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500">
                                                {currentGrade >= 6 ? <span className="text-green-500">Aprovado</span> : <span className="text-red-500">Reprovado</span>}
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Sidebar: Add Students */}
                <div className="lg:col-span-1">
                    <EnrollStudentForm classId={classId} students={allStudents} />
                </div>

            </div>
        </div>
    )
}
