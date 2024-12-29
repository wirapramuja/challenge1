/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const url = 'https://api.rajaongkir.com/starter/cost';
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 400 });
    }

    try {
        const body = await req.json();

        const { origin, destination, weight, courier } = body;

        // Validate required fields
        if (!origin || !destination || !weight || !courier) {
            return NextResponse.json(
                { error: 'All fields (origin, destination, weight, courier) are required' },
                { status: 400 }
            );
        }

        // Send POST request to RajaOngkir API
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                key: apiKey,
            },
            body: JSON.stringify({ origin, destination, weight, courier }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch shipping costs: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data); // Return data from RajaOngkir API
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: `Failed to fetch shipping costs: ${error.message}` }, { status: 500 });
    }
}
