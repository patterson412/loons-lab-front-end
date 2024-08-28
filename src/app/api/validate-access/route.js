import { NextResponse } from 'next/server';


export async function GET(request) {
    // Parse cookies from the request headers
    //const cookies = cookie.parse(request.headers.get("cookie") || ""); // This approach needed the cookie package installed
    const accessData = request.cookies.get('access');

    // Check if the access cookie is present
    if (!accessData) {
        return NextResponse.json({ message: "access cookie not found" }, { status: 401 });
    }

    // refreshing the expiry time of the cookie in case it is valid

    try {
        const userInfo = JSON.parse(accessData.value);
        const now = new Date();
        const expiryTime = new Date(userInfo.expiryTime);

        if (expiryTime < now) {
            return NextResponse.json({ message: "access cookie expired" }, { status: 401 });
        }

        const response = NextResponse.json({ message: "access cookie is valid" }, { status: 200 });

        userInfo.expiryTime = new Date(now.getTime() + 15 * 60 * 1000).toISOString(); // 15 minutes in milliseconds from now

        // updating with new cookie refreshing the expiry time

        response.cookies.set('access', JSON.stringify(userInfo), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // NextJS automatically handles the NODE_ENV, 
            path: "/",
            sameSite: "lax", // Help to prevent csrf attacks
            maxAge: 15 * 60, // 15 minutes in seconds
        });

        return response;

    } catch (error) {
        console.error('Error parsing cookie data:', error);
        return NextResponse.json({ message: 'Invalid cookie data' }, { status: 400 });
    }

};