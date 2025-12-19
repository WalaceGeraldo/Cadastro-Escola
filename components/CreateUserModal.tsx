
"use client"

import { useState } from "react"
import { createUser } from "@/app/actions/school"
import { X, Save, UserPlus } from "lucide-react"

interface CreateUserModalProps {
    onClose: () => void
}

export function CreateUserModal({ onClose }: CreateUserModalProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("TEACHER") // Defaulting to Teacher as per request context

    // New fields
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [motherName, setMotherName] = useState("")
    const [cpf, setCpf] = useState("")
    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("")
    const [houseNumber, setHouseNumber] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("role", role)

            if (dateOfBirth) formData.append("dateOfBirth", dateOfBirth)
            if (fatherName) formData.append("fatherName", fatherName)
            if (motherName) formData.append("motherName", motherName)
            if (cpf) formData.append("cpf", cpf)
            if (phone) formData.append("phone", phone)
            if (street) formData.append("street", street)
            if (houseNumber) formData.append("houseNumber", houseNumber)

            await createUser(formData)
            onClose()
        } catch (err: any) {
            setError(err.message || "Erro ao criar usuário")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="glass-card w-full max-w-2xl animate-fade-in relative my-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <UserPlus className="w-6 h-6 text-blue-400" />
                    Novo Usuário
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded mb-4 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Nome</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nome completo"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="email@escola.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Senha</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Função</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black"
                        >
                            <option value="TEACHER">Professor</option>
                            <option value="STUDENT">Aluno</option>
                            <option value="OWNER">Dono / Proprietário</option>
                        </select>
                    </div>

                    {role === 'STUDENT' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <h3 className="text-blue-400 font-medium mb-2 border-b border-white/10 pb-1">Dados Pessoais</h3>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:dark]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">CPF</label>
                                    <input
                                        type="text"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="000.000.000-00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Celular</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Nome do Pai</label>
                                    <input
                                        type="text"
                                        value={fatherName}
                                        onChange={(e) => setFatherName(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Nome da Mãe</label>
                                    <input
                                        type="text"
                                        value={motherName}
                                        onChange={(e) => setMotherName(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <h3 className="text-blue-400 font-medium mb-2 border-b border-white/10 pb-1">Endereço</h3>
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm text-gray-400 mb-1">Rua</label>
                                    <input
                                        type="text"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Número</label>
                                    <input
                                        type="text"
                                        value={houseNumber}
                                        onChange={(e) => setHouseNumber(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full glass-button bg-blue-600 hover:bg-blue-700 mt-2 flex justify-center items-center gap-2"
                    >
                        {isLoading ? "Criando..." : (
                            <>
                                <Save className="w-4 h-4" />
                                Criar Usuário
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
