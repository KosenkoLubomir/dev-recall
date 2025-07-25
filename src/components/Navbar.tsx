"use client";

import Image from "next/image";
import Link from "next/link";
import {useUserStore} from "@/stores/useUserStore";

const Navbar = () => {
    const { user } = useUserStore();

    return (
        <header className="flex justify-between items-center px-6 py-4 shadow-sm">
            <Link href="/">
                <Image
                    src="/images/dev-recall.png"
                    alt="Heard Logo"
                    width={88}
                    height={40}
                    className="h-10"
                />
            </Link>

            <nav className="flex gap-6 text-md font-medium">
                <Link href="/how-it-works">How It Works</Link>
                <Link href="/about">About</Link>
            </nav>

            { user?.id ? ( <>
                {user?.role && user?.level && user?.stack_items?.length ? (
                    <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md">Dashboard</Link> )
                    : (
                    <Link href="/onboarding" className="bg-blue-600 text-white px-4 py-2 rounded-md">Onboarding</Link>
                    )}
                </>
            ) : (
                <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md">Start for Free</Link>
                )}
        </header>
    );
}

export default Navbar;