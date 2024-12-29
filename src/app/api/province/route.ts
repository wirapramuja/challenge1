// src/app/shipping/province/route.ts

import { NextResponse } from 'next/server';

export async function GET() {

    const url = 'https://api.rajaongkir.com/starter/province';
    const apiKey = process.env.API_KEY

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 400 });
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            key: apiKey, // Include API key in the request headers
        },
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch provinces' }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json(data);
}
