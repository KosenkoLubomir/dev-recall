import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
        }

        const secret = process.env.TURNSTILE_SECRET_KEY!;
        const ip = req.headers.get("x-forwarded-for") || "";

        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip)}`
        });

        const data = await response.json();

        if (data.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: "Verification failed" }, { status: 400 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}