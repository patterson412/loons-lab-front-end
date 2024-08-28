import { NextResponse } from 'next/server';

const EXPIRY_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds


export async function POST(request) {
    try {
        const payload = await request.json();
        const { username, password } = payload;

        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        console.log(username, password);


        if (trimmedUsername === process.env.USERNAME && trimmedPassword === process.env.PASSWORD) {
            const response = NextResponse.json({ message: 'Username and password matched' }, { status: 200 });
            const userInfo = {
                username: trimmedUsername,
                expiryTime: new Date(Date.now() + EXPIRY_TIME).toISOString() // 15 minutes in milliseconds
            };
            response.cookies.set('access', JSON.stringify(userInfo), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // NextJS automatically handles the NODE_ENV, 
                path: "/",
                sameSite: "lax", // Help to prevent csrf attacks if set to strict
                maxAge: 15 * 60, // 15 minutes in seconds
            });
            return response;
        } else {
            return NextResponse.json({ message: 'Username and password not matched' }, { status: 401 });
        }

    } catch (error) {
        return NextResponse.json({ error: 'Failed to parse request body' }, { status: 400 });
    }
}


