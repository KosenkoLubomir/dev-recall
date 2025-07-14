import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
                <a href="/features">Features</a>
                <a href="/how-it-works">How It Works</a>
                <a href="/about">About</a>
            </nav>

            <a href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md">Start for Free</a>
        </header>
    );
}

export default Navbar;