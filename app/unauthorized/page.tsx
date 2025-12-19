
import Link from "next/link"

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="glass-card p-12 text-center max-w-md">
                <h1 className="text-4xl font-bold text-red-500 mb-4">401</h1>
                <h2 className="text-2xl font-bold mb-4">Acesso Negado</h2>
                <p className="text-gray-400 mb-8">
                    Você não tem permissão para acessar esta página.
                </p>
                <Link href="/" className="glass-button">
                    Voltar para Home
                </Link>
            </div>
        </div>
    )
}
