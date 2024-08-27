import { NextResponse } from 'next/server';
import axios from 'axios';


export async function POST(request) {
    try {
        const payload = await request.json();
        const { username, password } = payload;

        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        console.log(username, password);

        if ((trimmedUsername != null && trimmedUsername != undefined) && (trimmedPassword != null && trimmedPassword != undefined)) {
            if (trimmedUsername === process.env.USERNAME && trimmedPassword === process.env.PASSWORD) {
                let response = NextResponse.json({ message: 'Username and password matched' }, { status: 200 });
                const userInfo = {
                    username: username,
                    expiryTime: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
                };
                response.cookies.set('access', JSON.stringify(userInfo), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // NextJS automatically handles the NODE_ENV, 
                    path: "/",
                    sameSite: "strict", // Help to prevent csrf attacks
                    maxAge: 15 * 60, // 15 minutes
                });
                return response;
            } else {
                return NextResponse.json({ message: 'Username and password not matched' }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: 'Error with Username or Password try again' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to parse request body' }, { status: 400 });
    }
}


