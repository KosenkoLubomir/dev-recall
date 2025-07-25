'use client';

import React from 'react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800 py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">About DevRecall</h1>
                <p className="text-lg mb-6">
                    DevRecall is a platform designed to help developers document, organize, and revisit their knowledge throughout their engineering journey. Whether you're preparing for interviews, managing technical notes, or just want a personal wiki — DevRecall makes it effortless.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                <p className="mb-6">
                    We aim to empower developers by giving them tools to structure their learning and recall it when it matters most — during interviews, on the job, or when mentoring others.
                </p>

                <h2 className="text-2xl font-semibold mb-2">The Team</h2>
                <p className="mb-6">
                    Built by passionate engineers, for engineers. We're a small team that believes in user-focused design, performance, and elegant simplicity.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Tech Stack</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Frontend: React, Tailwind CSS, Next.js</li>
                    <li>Backend: Supabase</li>
                    <li>State Management: Zustand</li>
                    <li>Authentication: Supabase Auth</li>
                </ul>

                {/*<p className="text-sm text-gray-500">*/}
                {/*    Questions or feedback? Reach out to us at <a href="mailto:hello@devrecall.com" className="text-blue-600 underline">hello@devrecall.com</a>.*/}
                {/*</p>*/}
            </div>
        </main>
    );
}