
export default function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Configurações do Sistema</h1>
                <p className="text-gray-400">Ajuste parâmetros globais da escola</p>
            </div>

            <div className="glass-card p-8 space-y-6">
                <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                    <h3 className="text-lg font-bold text-white mb-2">Manutenção</h3>
                    <p className="text-gray-400 mb-4">Ativar modo de manutenção impedirá o acesso de alunos.</p>
                    <button className="glass-button bg-red-600 hover:bg-red-700">Ativar Modo Manutenção</button>
                </div>
            </div>
        </div>
    )
}
