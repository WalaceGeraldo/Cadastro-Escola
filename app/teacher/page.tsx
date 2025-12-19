
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route" // Adjusted path
import Link from "next/link"
import { createClass } from "@/app/actions/school"
import { BookOpen, Calendar, PlusCircle } from "lucide-react"

export default async function TeacherDashboard() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return <div>Erro: Usuário não identificado</div>
    }

    // Fetch classes for this teacher
    const classes = await prisma.class.findMany({
        where: {
            teacher: {
                email: session.user.email
            }
        },
        include: {
            _count: {
                select: { enrollments: true }
            }
        }
    })

    // We need the teacher's ID for the form field
    const teacherUser = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Minhas Turmas</h1>
                <p className="text-gray-400">Gerencie suas aulas e alunos</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Class Form */}
                <div className="lg:col-span-1">
                    <div className="glass-card p-6 border-l-4 border-l-purple-500">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <PlusCircle className="w-5 h-5" />
                            Criar Nova Turma
                        </h2>
                        <form action={createClass} className="space-y-4">
                            <input type="hidden" name="teacherId" value={teacherUser?.id} />
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Nome da Matéria/Turma</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Ex: Matemática 1º Ano"
                                />
                            </div>
                            <button type="submit" className="w-full glass-button hover:bg-purple-500/20">
                                Criar Turma
                            </button>
                        </form>
                    </div>
                </div>

                {/* Class List */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classes.length === 0 ? (
                        <div className="col-span-2 glass-card p-8 text-center text-gray-500">
                            Você ainda não possui turmas cadastradas.
                        </div>
                    ) : (
                        classes.map((cls) => (
                            <Link href={`/teacher/classes/${cls.id}`} key={cls.id}>
                                <div className="glass-card p-6 cursor-pointer hover:bg-white/5 transition-all group border-l-4 border-l-blue-500">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded">ID: {cls.id.slice(0, 4)}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1">{cls.name}</h3>
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {cls._count.enrollments} Alunos
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
