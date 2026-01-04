
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Find a student to attach invoices to
    const students = await prisma.user.findMany({
        where: { role: 'STUDENT' }
    })

    if (students.length === 0) {
        console.log('Nenhum aluno encontrado para gerar boletos.')
        return
    }

    console.log(`Encontrados ${students.length} alunos. Gerando boletos...`)

    for (const student of students) {
        // Create 3 invoices for each student
        await prisma.invoice.create({
            data: {
                studentId: student.id,
                description: 'Mensalidade Janeiro/2026',
                amount: 1500.00,
                dueDate: new Date('2026-01-15'),
                status: 'PENDING',
                barcode: '83620000001-4 56780099000-1 12345678900-0 12345678900-5'
            }
        })

        await prisma.invoice.create({
            data: {
                studentId: student.id,
                description: 'Material Didático 2026',
                amount: 850.50,
                dueDate: new Date('2026-01-10'),
                status: 'PAID',
                barcode: '83620000001-4 56780099000-1 12345678900-0 12345678900-5'
            }
        })

        await prisma.invoice.create({
            data: {
                studentId: student.id,
                description: 'Mensalidade Dezembro/2025',
                amount: 1400.00,
                dueDate: new Date('2025-12-15'),
                status: 'OVERDUE',
                barcode: '83620000001-4 56780099000-1 12345678900-0 12345678900-5'
            }
        })

        console.log(`Boletos gerados para o aluno: ${student.name}`)
    }
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
