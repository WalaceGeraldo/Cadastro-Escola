
"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createStudent(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
        throw new Error("Missing fields")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "STUDENT",
        },
    })

    revalidatePath("/admin/students")
    revalidatePath("/admin/students")
    redirect("/admin/students")
}

export async function createUser(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string

    // Optional fields
    const dateOfBirth = formData.get("dateOfBirth") as string
    const fatherName = formData.get("fatherName") as string
    const motherName = formData.get("motherName") as string
    const cpf = formData.get("cpf") as string
    const phone = formData.get("phone") as string
    const street = formData.get("street") as string
    const houseNumber = formData.get("houseNumber") as string

    if (!name || !email || !password || !role) {
        throw new Error("Missing fields")
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        throw new Error("Email already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            fatherName: fatherName || null,
            motherName: motherName || null,
            cpf: cpf || null,
            phone: phone || null,
            street: street || null,
            houseNumber: houseNumber || null,
        },
    })

    revalidatePath("/admin/users")
}

export async function registerStudentPublic(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
        throw new Error("Missing fields")
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        throw new Error("Email already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "STUDENT",
        },
    })

    return { success: true }
}

export async function createClass(formData: FormData) {
    const name = formData.get("name") as string
    const teacherId = formData.get("teacherId") as string

    if (!name || !teacherId) {
        throw new Error("Missing fields")
    }

    await prisma.class.create({
        data: {
            name,
            teacherId,
        },
    })

    revalidatePath("/teacher")
    redirect("/teacher")
}

export async function searchStudents(query: string) {
    if (!query) return []
    return await prisma.user.findMany({
        where: {
            role: "STUDENT",
            OR: [
                { name: { contains: query } },
                { email: { contains: query } }
            ]
        },
        take: 5
    })
}

export async function enrollStudent(classId: string, studentId: string) {
    const existing = await prisma.enrollment.findFirst({
        where: { classId, studentId }
    })

    if (existing) return

    await prisma.enrollment.create({
        data: {
            classId,
            studentId,
        }
    })

    revalidatePath(`/teacher/classes/${classId}`)
}

export async function updateGrade(classId: string, studentId: string, value: number, description?: string) {
    const existing = await prisma.grade.findFirst({
        where: { classId, studentId }
    })

    if (existing) {
        await prisma.grade.update({
            where: { id: existing.id },
            data: { value, description }
        })
    } else {
        await prisma.grade.create({
            data: { classId, studentId, value, description: description || "Nota" }
        })
    }

    revalidatePath(`/teacher/classes/${classId}`)
}

export async function updateUser(formData: FormData) {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string

    // Optional fields
    const dateOfBirth = formData.get("dateOfBirth") as string
    const fatherName = formData.get("fatherName") as string
    const motherName = formData.get("motherName") as string
    const cpf = formData.get("cpf") as string
    const phone = formData.get("phone") as string
    const street = formData.get("street") as string
    const houseNumber = formData.get("houseNumber") as string

    if (!id || !role) {
        throw new Error("Missing fields")
    }

    const existingUser = await prisma.user.findUnique({ where: { id } })

    if (!existingUser) {
        throw new Error("User not found")
    }

    // if (existingUser.role === "ADMIN") { ... }

    try {
        await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                role,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                fatherName: fatherName || null,
                motherName: motherName || null,
                cpf: cpf || null,
                phone: phone || null,
                street: street || null,
                houseNumber: houseNumber || null,
            }
        })
    } catch (error) {
        console.error("Error updating user:", error)
        throw error
    }

    revalidatePath("/admin/users")
}
