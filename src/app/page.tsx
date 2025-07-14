
// app/page.tsx

import Navbar from "@/components/Navbar";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar/>


            {/* Hero */}
            <section className="px-6 py-16 text-center max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Never forget what matters before your next interview.</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Structure your tech prep, revisit feedback, and build confidence.
                </p>
                <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold">
                    Create My DevRecall
                </a>
            </section>

            {/* Problem Section */}
            <section className="bg-gray-50 px-6 py-16" id="problem">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-4">Interview prep is chaotic.</h3>
                    <ul className="text-left list-disc list-inside space-y-2 text-gray-700">
                        <li>Notes scattered across Notion, Google Docs, bookmarks</li>
                        <li>Feedback gets forgotten</li>
                        <li>No place to structure your learning</li>
                    </ul>
                </div>
            </section>

            {/* Solution Section */}
            <section className="px-6 py-16 text-center" id="features">
                <h3 className="text-2xl font-bold mb-6">DevRecall is your personal interview memory</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <div>
                        <div className="text-3xl">📁</div>
                        <p className="font-semibold">Structured Folders & Pages</p>
                    </div>
                    <div>
                        <div className="text-3xl">📌</div>
                        <p className="font-semibold">Bookmark Videos & Links</p>
                    </div>
                    <div>
                        <div className="text-3xl">🌐</div>
                        <p className="font-semibold">Public or Private Notes</p>
                    </div>
                    <div>
                        <div className="text-3xl">🤝</div>
                        <p className="font-semibold">Share Tips with Similar Devs</p>
                    </div>
                </div>
            </section>

            {/* Onboarding Section */}
            <section className="bg-gray-50 px-6 py-16" id="how-it-works">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-4">Onboarding made simple</h3>
                    <ol className="list-decimal list-inside text-gray-700 text-left mx-auto max-w-md space-y-2">
                        <li>Choose your role and level</li>
                        <li>Select your stack (or add your own)</li>
                        <li>Choose privacy setting</li>
                        <li>Get a smart starting point</li>
                    </ol>
                    <a href="#" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold">
                        Start for Free
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t px-6 py-6 text-center text-sm text-gray-500">
                <p>© 2025 DevRecall. All rights reserved.</p>
            </footer>
        </div>
    );
}
