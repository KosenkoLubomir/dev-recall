"use client";

import Link from "next/link";
import {useUserStore} from "@/stores/useUserStore";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

const Navbar = () => {
    const { user } = useUserStore();

    return (
        <header className="flex justify-between items-center px-6 py-4 shadow-md">
            <Logo />

            <nav className="flex gap-6 text-md font-medium">
                <Link href="/how-it-works" className={"font-semibold hover:text-blue-500"}>How It Works</Link>
                <Link href="/about" className={"font-semibold hover:text-blue-500"}>About</Link>
                <Link href="/pricing" className={"font-semibold hover:text-blue-500"}>Pricing</Link>
            </nav>

            { user?.id ? ( <>
                {user?.role && user?.level && user?.stack_items?.length ? (
                    <Button type={"link"} view={"primary"} href={"/dashboard"}>Dashboard</Button>)
                    : (
                    <Button type={"link"} view={"primary"} href={"/onboarding"}>Onboarding</Button>
                    )}
                </>
            ) : (
                <Button type={"link"} view={"primary"} href={"/auth/signup"}>Start for Free</Button>
                )}
        </header>
    );
}

export default Navbar;