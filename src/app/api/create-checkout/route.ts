import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { user_id, price_id } = await req.json();

    const res = await fetch('https://api.paddle.com/checkout', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                {
                    price_id,
                    quantity: 1
                }
            ],
            custom_data: { user_id }, // link Paddle purchase to Supabase user
            success_url: 'https://devrecall.com/success',
            cancel_url: 'https://devrecall.com/cancel'
        })
    });

    const data = await res.json();
    return NextResponse.json(data);
}