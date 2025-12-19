
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db"
        }
    }
})

async function main() {
    const hashedPassword = await bcrypt.hash('123456', 10)

    // Create Admin
    await prisma.user.upsert({
        where: { email: 'admin@school.com' },
        update: {},
        create: {
            email: 'admin@school.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    // Create Owner
    await prisma.user.upsert({
        where: { email: 'owner@school.com' },
        update: {},
        create: {
            email: 'owner@school.com',
            name: 'School Owner',
            password: hashedPassword,
            role: 'OWNER',
        },
    })

    // Create Teacher
    await prisma.user.upsert({
        where: { email: 'teacher@school.com' },
        update: {},
        create: {
            email: 'teacher@school.com',
            name: 'Teacher One',
            password: hashedPassword,
            role: 'TEACHER',
        },
    })

    // Create Student
    await prisma.user.upsert({
        where: { email: 'student@school.com' },
        update: {},
        create: {
            email: 'student@school.com',
            name: 'Student One',
            password: hashedPassword,
            role: 'STUDENT',
        },
    })

    console.log('Database seeded!')
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
