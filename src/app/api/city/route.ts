/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const provinceId = searchParams.get('province_id'); // Ambil province_id dari query parameter

    if (!provinceId) {
        return NextResponse.json({ error: 'province_id is required' }, { status: 400 });
    }

    const url = `https://api.rajaongkir.com/starter/city?province=${provinceId}`;
    const apiKey = process.env.API_KEY;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                key: apiKey || '',
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
