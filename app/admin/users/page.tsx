import { prisma } from "@/lib/prisma"
import { UserManagementList } from "@/components/UserManagementList"

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Gerenciar Usuários</h1>
                    <p className="text-gray-400">Administre contas de todos os níveis</p>
                </div>
            </div>

            <UserManagementList users={users} />
        </div>
    )
}
