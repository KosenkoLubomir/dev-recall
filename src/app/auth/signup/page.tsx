'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Link from "next/link";
import Script from "next/script";

export default function SignUpPage() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    useEffect(() => {
        // Register the callback so Turnstile can call it
        if (typeof window === 'undefined') return;
        /* eslint-disable */
        (window as any).javascriptCallback = function (token: string) {
            setTurnstileToken(token);
        };
        /* eslint-enable */
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!turnstileToken) {
            setError('Please verify you are human.');
            return;
        }

        setLoading(true);

        // Send token to your backend for verification
        const verifyRes = await fetch('/api/verify-turnstile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: turnstileToken }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
            setError('Captcha verification failed.');
            setLoading(false);
            return;
        }

        // If captcha passes → continue signup
        const { error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: {
                emailRedirectTo: `${location.origin}/onboarding`,
                data: { name: form.name },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/auth/check-email');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                async
                defer
            />
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <div className={"text-center"}>
                    <Logo classes={"mb-6 justify-center inline-flex"}/>
                </div>

                <h2 className="text-2xl font-bold mb-4">Create Account</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 focus:outline-none border-gray-300 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 focus:outline-none border-gray-300 focus:border-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 focus:outline-none border-gray-300 focus:border-blue-500"
                    />
                </div>


                <div
                    className="cf-turnstile flex justify-center mb-4"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    data-callback="javascriptCallback"
                ></div>

                <div className={"text-center"}>
                    <Button type={"submit"} view={"primary"}
                            disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</Button>
                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}