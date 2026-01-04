
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@admin.com'
    const password = await bcrypt.hash('admin123', 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password, // Update password if user exists
            role: 'OWNER' // Ensure role is OWNER
        },
        create: {
            email,
            password,
            name: 'Admin User',
            role: 'OWNER',
        },
    })

    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
