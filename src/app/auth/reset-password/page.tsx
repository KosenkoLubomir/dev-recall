'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Link from "next/link";

export default function ResetPasswordPage() {
    const supabase = createClientComponentClient();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        });

        if (error) {
            setStatus('error');
            setError(error.message);
        } else {
            setStatus('success');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <form onSubmit={handleReset} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className={"text-center"}>
                    <Logo classes={"mb-6 justify-center inline-flex"}/>
                </div>

                <h1 className="text-2xl font-semibold mb-4">Reset Your Password</h1>

                {status === 'success' && (
                    <p className="text-green-600 mb-3">Check your inbox for the reset link.</p>
                )}
                {status === 'error' && <p className="text-red-500 mb-3">{error}</p>}

                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-2 focus:outline-none border-gray-300 focus:border-blue-500"
                />
                <p className={"text-sm text-gray-500 mb-6 text-right"}>
                    <span className="text-sm text-gray-500">Go back to </span>
                    <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
                </p>

                <div className={"text-center"}>
                    <Button type={"submit"} view={"primary"} disabled={status === 'loading'}>{status === 'loading' ? 'Sending...' : 'Send Reset Link'}</Button>
                </div>
            </form>
        </div>
    );
}