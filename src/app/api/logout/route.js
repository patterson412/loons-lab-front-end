import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function GET(request) {
    // Destroy the 'access' cookie
    /*response.cookies.set('access', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 0,
    });*/
    cookies().delete('access');

    return NextResponse.json({ message: "Logging out..." }, { status: 200 });
}
