
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { FileText, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default async function FinancialPage() {
    const session = await getServerSession(authOptions)

    const invoices = await prisma.invoice.findMany({
        where: { studentId: session?.user?.id },
        orderBy: { dueDate: 'desc' }
    })

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'bg-green-500/10 text-green-400 border-green-500/20'
            case 'OVERDUE':
                return 'bg-red-500/10 text-red-400 border-red-500/20'
            default:
                return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PAID': return <CheckCircle className="w-4 h-4" />
            case 'OVERDUE': return <AlertCircle className="w-4 h-4" />
            default: return <Clock className="w-4 h-4" />
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'PAID': return 'Pago'
            case 'OVERDUE': return 'Vencido'
            default: return 'Pendente'
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Financeiro</h1>
                <p className="text-gray-400">Gerencie suas mensalidades e pagamentos</p>
            </div>

            {invoices.length === 0 ? (
                <div className="glass-card p-12 text-center text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum boleto encontrado.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {invoices.map(invoice => (
                        <div key={invoice.id} className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 group hover:bg-white/5 transition-all">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-lg text-white">{invoice.description}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${getStatusStyle(invoice.status)}`}>
                                        {getStatusIcon(invoice.status)}
                                        {getStatusLabel(invoice.status)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Vencimento: {invoice.dueDate.toLocaleDateString('pt-BR')}
                                </p>
                                {invoice.barcode && (
                                    <p className="text-xs text-gray-500 mt-2 font-mono bg-black/20 p-2 rounded max-w-fit">
                                        {invoice.barcode}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <span className="block text-sm text-gray-400">Valor</span>
                                    <span className="text-xl font-bold text-white">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(invoice.amount)}
                                    </span>
                                </div>

                                {invoice.status !== 'PAID' && (
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                                        Pagar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
