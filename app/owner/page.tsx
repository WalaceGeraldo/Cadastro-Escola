
import { prisma } from "@/lib/prisma"
import { TrendingUp, Users, DollarSign } from "lucide-react"

export default async function OwnerDashboard() {
    const studentCount = await prisma.user.count({
        where: { role: "STUDENT" }
    })
    // Mock financial data or other high level stats
    const revenue = 125000

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Painel do Proprietário</h1>
                <p className="text-gray-400">Visão estratégica da escola</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-card p-6 from-blue-500/10 to-purple-500/10 bg-gradient-to-br border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-200">Total de Alunos</h3>
                        <Users className="text-blue-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">{studentCount}</p>
                    <span className="text-sm text-green-400 flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 mr-1" /> +12% esse mês
                    </span>
                </div>

                <div className="glass-card p-6 from-green-500/10 to-emerald-500/10 bg-gradient-to-br border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-200">Receita Estimada</h3>
                        <DollarSign className="text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">R$ {revenue.toLocaleString('pt-BR')}</p>
                    <span className="text-sm text-gray-400 mt-2 block">
                        Mensalidade média: R$ 850
                    </span>
                </div>
            </div>
        </div>
    )
}
