
import { prisma } from "@/lib/prisma"
import { TrendingUp, Users, DollarSign, BookOpen } from "lucide-react"

export default async function OwnerStatsPage() {
    const studentCount = await prisma.user.count({ where: { role: 'STUDENT' } })
    // Mock data for demonstration since we don't have full financial tables
    const classesCount = await prisma.class.count()

    const stats = [
        { name: 'Total de Alunos', value: studentCount.toString(), change: '+12%', icon: Users, color: 'text-blue-400' },
        { name: 'Receita Mensal', value: 'R$ 45.000', change: '+5.4%', icon: DollarSign, color: 'text-green-400' },
        { name: 'Turmas Ativas', value: classesCount.toString(), change: '0%', icon: BookOpen, color: 'text-purple-400' },
        { name: 'Taxa de Aprovação', value: '94%', change: '+2%', icon: TrendingUp, color: 'text-yellow-400' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Estatísticas Financeiras e Acadêmicas</h1>
                <p className="text-gray-400">Relatórios detalhados da sua instituição</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="glass-card p-6 border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                            <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-400 font-medium">{stat.change}</span>
                            <span className="text-gray-500 ml-2">vs. mês passado</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for a Chart */}
            <div className="glass-card p-8 h-96 flex items-center justify-center border-dashed border-2 border-white/10">
                <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-400">Gráfico de Crescimento</h3>
                    <p className="text-gray-500">(Integração com biblioteca de gráficos pendente)</p>
                </div>
            </div>
        </div>
    )
}
