import { NextResponse } from 'next/server';

export function GET(request) {
    const response = NextResponse.redirect(`${request.nextUrl.origin}/login`); // Redirect to login page

    // Destroy the 'access' cookie
    response.cookies.set('access', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 0,
    });

    return response;
}
