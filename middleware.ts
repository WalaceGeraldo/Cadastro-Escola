
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // Redirect authenticated users from root to their dashboard
        if (path === "/" && token) {
            if (token.role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url))
            if (token.role === "OWNER") return NextResponse.redirect(new URL("/owner", req.url))
            if (token.role === "TEACHER") return NextResponse.redirect(new URL("/teacher", req.url))
            if (token.role === "STUDENT") return NextResponse.redirect(new URL("/student", req.url))
        }

        // Protect role-based routes
        if (path.startsWith("/admin")) {
            // OWNER has full access to admin routes
            if (token?.role === "OWNER") {
                // Allow access
            }
            else if (token?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/unauthorized", req.url))
            }
        }
        if (path.startsWith("/owner") && token?.role !== "OWNER") {
            return NextResponse.redirect(new URL("/unauthorized", req.url))
        }
        if (path.startsWith("/teacher") && token?.role !== "TEACHER") {
            return NextResponse.redirect(new URL("/unauthorized", req.url))
        }
        if (path.startsWith("/student") && token?.role !== "STUDENT") {
            return NextResponse.redirect(new URL("/unauthorized", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (req.nextUrl.pathname === "/") return true
                return !!token
            }
        },
    }
)

export const config = {
    matcher: ["/", "/admin/:path*", "/owner/:path*", "/teacher/:path*", "/student/:path*"]
}
