import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {

    const { searchParams } = request.nextUrl; // outside the try-catch block, allowing Next.js to detect the dynamic usage early. This prompts Next.js to opt the route into dynamic rendering automatically.
    try {

        const latitude = searchParams.get('lat');
        const longitude = searchParams.get('lon');

        if (latitude && longitude) {
            const result = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
                params: {
                    lat: latitude,
                    lon: longitude,
                    appid: process.env.API_KEY
                }
            });

            if (result.data) {
                console.log(result.data);
                return NextResponse.json(result.data);
            } else {
                return NextResponse.json({ error: 'No data received from weather API' }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: 'Error with lat or lon, try again' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
}