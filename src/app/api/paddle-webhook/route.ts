import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

async function getRawBody(req: NextRequest): Promise<string> {
    const buf = await req.arrayBuffer();
    return Buffer.from(buf).toString('utf8');
}

function verifyPaddleSignature(rawBody: string, signature: string, secret: string) {
    const hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get('paddle-signature');
    if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const rawBody = await getRawBody(req);

    if (!verifyPaddleSignature(rawBody, signature, process.env.PADDLE_WEBHOOK_SECRET!)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

    try {
        switch (event.type) {
            case 'subscription.activated': {
                await supabase.from('user_subscriptions').upsert({
                    user_id: event.data.custom_data.user_id,
                    subscription_id: event.data.id,
                    status: 'active',
                    activated_at: new Date().toISOString(),
                    expires_at: new Date(event.data.next_billed_at).toISOString()
                });
                break;
            }

            case 'subscription.updated': {
                await supabase.from('user_subscriptions')
                    .update({
                        status: 'active',
                        expires_at: new Date(event.data.next_billed_at).toISOString()
                    })
                    .eq('subscription_id', event.data.id);
                break;
            }

            case 'subscription.payment_failed': {
                const graceExpires = new Date();
                graceExpires.setDate(graceExpires.getDate() + 7);
                await supabase.from('user_subscriptions')
                    .update({
                        status: 'grace',
                        expires_at: graceExpires.toISOString()
                    })
                    .eq('subscription_id', event.data.id);
                break;
            }

            case 'subscription.cancelled': {
                await supabase.from('user_subscriptions')
                    .update({
                        status: 'cancelled'
                    })
                    .eq('subscription_id', event.data.id);
                break;
            }

            default:
                console.log('Unhandled event:', event.type);
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}