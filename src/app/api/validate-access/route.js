import { NextResponse } from 'next/server';
import cookie from 'cookie';


export async function GET(request) {
    // Parse cookies from the request headers
    const cookies = cookie.parse(request.headers.get("cookie") || "");
    const accessData = cookies.access;

    // Check if the access cookie is present
    if (!accessData) {
        return NextResponse.json({ message: "access cookie not found" }, { status: 401 });
    }

    // handling instances if the cookie somehow exists even after expiration

    try {
        const parsedData = JSON.parse(accessData);
        const now = new Date();
        const expiryTime = new Date(parsedData.expiryTime);

        if (expiryTime < now) {
            return NextResponse.json({ message: "access cookie expired" }, { status: 401 });
        }

        return NextResponse.json({ message: "access cookie is valid" }, { status: 200 });

    } catch (error) {
        console.error('Error parsing cookie data:', error);
        return NextResponse.json({ message: 'Invalid cookie data' }, { status: 400 });
    }

};