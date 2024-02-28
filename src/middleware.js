import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = request.cookies.get("token")?.value || ""
    const publicPath = request.nextUrl.pathname == "/"

    if (token && publicPath) {
        console.log("no public");

        return NextResponse.redirect(new URL('/cardetails', request.url))
    }
    if (!token && !publicPath) {
        console.log(" public");
        return NextResponse.redirect(new URL('/', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/cardetails:path*"
    ]
}