
"use client"

import { useState } from "react"
import { updateUser } from "@/app/actions/school"
import { X, Save, AlertTriangle } from "lucide-react"

// ... imports

interface User {
    id: string
    name: string | null
    email: string
    role: string
    // Optional fields
    dateOfBirth?: Date | null
    fatherName?: string | null
    motherName?: string | null
    cpf?: string | null
    phone?: string | null
    street?: string | null
    houseNumber?: string | null
}

interface EditUserModalProps {
    user: User
    onClose: () => void
}

export function EditUserModal({ user, onClose }: EditUserModalProps) {
    const [name, setName] = useState(user.name || "")
    const [email, setEmail] = useState(user.email)
    const [role, setRole] = useState(user.role)

    // New fields state
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "")
    const [fatherName, setFatherName] = useState(user.fatherName || "")
    const [motherName, setMotherName] = useState(user.motherName || "")
    const [cpf, setCpf] = useState(user.cpf || "")
    const [phone, setPhone] = useState(user.phone || "")
    const [street, setStreet] = useState(user.street || "")
    const [houseNumber, setHouseNumber] = useState(user.houseNumber || "")

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // Calculate age
    const age = dateOfBirth ? Math.floor((new Date().getTime() - new Date(dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : ""

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const formData = new FormData()
            formData.append("id", user.id)
            formData.append("name", name)
            formData.append("email", email)
            formData.append("role", role)

            // Append optional fields
            if (dateOfBirth) formData.append("dateOfBirth", dateOfBirth)
            if (fatherName) formData.append("fatherName", fatherName)
            if (motherName) formData.append("motherName", motherName)
            if (cpf) formData.append("cpf", cpf)
            if (phone) formData.append("phone", phone)
            if (street) formData.append("street", street)
            if (houseNumber) formData.append("houseNumber", houseNumber)

            await updateUser(formData)
            onClose()
        } catch (err) {
            setError("Falha ao atualizar usuário.")
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

                <h2 className="text-xl font-bold text-white mb-6">Editar Usuário</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded mb-4 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <h3 className="text-blue-400 font-medium mb-2 border-b border-white/10 pb-1">Informações Básicas</h3>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Função</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black"
                            >
                                <option value="STUDENT">Aluno</option>
                                <option value="TEACHER">Professor</option>
                                <option value="OWNER">Dono</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>
                    </div>

                    {role === 'STUDENT' && (
                        <>
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
                                    <label className="block text-sm text-gray-400 mb-1">Idade (Calculada)</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={age ? `${age} anos` : ""}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                                        placeholder="Preencha a data de nascimento"
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
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full glass-button bg-blue-600 hover:bg-blue-700 mt-2 flex justify-center items-center gap-2"
                    >
                        {isLoading ? "Salvando..." : (
                            <>
                                <Save className="w-4 h-4" />
                                Salvar Alterações
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
