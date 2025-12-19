
"use client"

import { useState } from "react"
import { enrollStudent } from "@/app/actions/school"
import { Search, UserPlus, Check, ChevronsUpDown } from "lucide-react"

interface Student {
    id: string
    name: string | null
    email: string
}

interface EnrollStudentFormProps {
    classId: string
    students: Student[]
}

export function EnrollStudentForm({ classId, students }: EnrollStudentFormProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStudentId, setSelectedStudentId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleEnroll = async () => {
        if (!selectedStudentId) return

        setIsPending(true)
        try {
            await enrollStudent(classId, selectedStudentId)
            // Reset state
            setSelectedStudentId("")
            setSearchTerm("")
            setIsOpen(false)
        } catch (error) {
            console.error("Failed to enroll:", error)
        } finally {
            setIsPending(false)
        }
    }

    const selectedStudent = students.find(s => s.id === selectedStudentId)

    return (
        <div className="glass-card p-6 sticky top-8">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" />
                Matricular Aluno
            </h3>

            <div className="space-y-4">
                <div className="relative">
                    <label className="block text-sm text-gray-400 mb-1">Buscar Aluno</label>

                    {/* Trigger Button pretending to be a select */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-left text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <span className="truncate">
                            {selectedStudent
                                ? `${selectedStudent.name} (${selectedStudent.email})`
                                : "Selecione um aluno..."
                            }
                        </span>
                        <ChevronsUpDown className="w-4 h-4 opacity-50" />
                    </button>

                    {/* Dropdown Content */}
                    {isOpen && (
                        <div className="absolute z-50 mt-1 w-full bg-[#1a1f2e] border border-white/10 rounded-lg shadow-xl overflow-hidden max-h-60 flex flex-col">
                            {/* Search Input */}
                            <div className="p-2 border-b border-white/10 sticky top-0 bg-[#1a1f2e]">
                                <div className="flex items-center px-2 bg-white/5 rounded border border-white/10">
                                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Filtrar por nome ou email..."
                                        className="w-full bg-transparent border-none py-2 text-sm text-white focus:outline-none placeholder-gray-500"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* List options */}
                            <div className="overflow-y-auto flex-1 p-1">
                                {filteredStudents.length === 0 ? (
                                    <div className="p-3 text-sm text-gray-500 text-center">
                                        Nenhum aluno encontrado.
                                    </div>
                                ) : (
                                    filteredStudents.map(student => (
                                        <button
                                            key={student.id}
                                            onClick={() => {
                                                setSelectedStudentId(student.id)
                                                setIsOpen(false)
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm rounded flex items-center justify-between group ${selectedStudentId === student.id
                                                    ? "bg-blue-500/20 text-blue-300"
                                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <div className="truncate">
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-xs opacity-70">{student.email}</div>
                                            </div>
                                            {selectedStudentId === student.id && (
                                                <Check className="w-4 h-4 text-blue-400" />
                                            )}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleEnroll}
                        disabled={!selectedStudentId || isPending}
                        className={`w-full glass-button bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 ${(!selectedStudentId || isPending) ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isPending ? "Adicionando..." : "Adicionar à Turma"}
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs text-gray-500">
                        Os alunos devem estar cadastrados no sistema para aparecer na lista. Use a busca para filtrar.
                    </p>
                </div>
            </div>
        </div>
    )
}
