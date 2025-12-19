
"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Lock, Mail, ArrowRight, BookOpen, User } from "lucide-react"

import { registerStudentPublic } from "./actions/school"

export default function LoginPage() {
  const [mode, setMode] = useState<"LOGIN" | "REGISTER">("LOGIN")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      window.location.href = "/"
    } else {
      setIsLoading(false)
      setError("Credenciais inválidas.")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)

      await registerStudentPublic(formData)
      setSuccess("Conta criada com sucesso! Faça login.")
      setMode("LOGIN")
    } catch (err) {
      setError("Erro ao criar conta. Tente outro email.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <div className="z-10 w-full max-w-md p-6">
        <div className="glass-card border border-white/10 shadow-2xl backdrop-blur-2xl bg-black/40 rounded-2xl overflow-hidden relative group">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70" />

          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4 ring-1 ring-white/20 shadow-inner">
                <BookOpen className="w-8 h-8 text-blue-400 drop-shadow-lg" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                Escola <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Premium</span>
              </h1>

              {/* Tabs */}
              <div className="flex justify-center gap-4 mt-6 border-b border-white/10 pb-2">
                <button
                  onClick={() => setMode("LOGIN")}
                  className={`text-sm font-medium pb-2 border-b-2 transition-all ${mode === "LOGIN" ? "text-blue-400 border-blue-400" : "text-gray-500 border-transparent hover:text-gray-300"}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode("REGISTER")}
                  className={`text-sm font-medium pb-2 border-b-2 transition-all ${mode === "REGISTER" ? "text-purple-400 border-purple-400" : "text-gray-500 border-transparent hover:text-gray-300"}`}
                >
                  Cadastro Aluno
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-green-400 text-sm text-center">
                {success}
              </div>
            )}

            <form onSubmit={mode === "LOGIN" ? handleLogin : handleRegister} className="space-y-6">

              {mode === "REGISTER" && (
                <div className="space-y-1 animate-fade-in">
                  <div className={`relative transition-all duration-300 ${focusedInput === 'name' ? 'transform scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={`h-5 w-5 transition-colors ${focusedInput === 'name' ? 'text-purple-400' : 'text-gray-500'}`} />
                    </div>
                    <input
                      type="text"
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 transition-all sm:text-sm"
                      placeholder="Nome Completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className={`relative transition-all duration-300 ${focusedInput === 'email' ? 'transform scale-[1.02]' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors ${focusedInput === 'email' ? 'text-blue-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="email"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all sm:text-sm"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className={`relative transition-all duration-300 ${focusedInput === 'password' ? 'transform scale-[1.02]' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${focusedInput === 'password' ? 'text-purple-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="password"
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 transition-all sm:text-sm"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">Processing...</span>
                ) : (
                  <span className="flex items-center">
                    {mode === "LOGIN" ? "Acessar Plataforma" : "Criar Conta"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>
          </div>

          <div className="px-8 py-4 bg-black/20 text-center border-t border-white/5">
            <p className="text-xs text-gray-500">
              {mode === "LOGIN" ? "Ainda não tem conta? Clique em Cadastro Aluno." : "Já tem conta? Clique em Login."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
