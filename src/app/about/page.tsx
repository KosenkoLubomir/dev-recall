import Logo from "@/components/Logo";
import React from "react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800 py-12 px-6">
            <div className="max-w-3xl mx-auto">
                `<div className={"text-center"}>`
                    <Logo classes={"mb-6 justify-center inline-flex"}/>
                </div>

                <h1 className="text-2xl font-bold mb-4 text-center">About DevRecall</h1>

                <p className={"mb-4"}>
                    <strong>DevRecall</strong> is a personal space for developers to structure, store, and refresh their technical knowledge — especially when preparing for interviews or switching stacks.
                </p>

                <h2 className="text-xl font-semibold mb-2">Why DevRecall Exists</h2>
                <p className={"mb-2"}>
                    As developers, we learn a lot — but much of that knowledge is scattered across Notion docs, bookmarks, YouTube videos, and old project folders. Over time, even valuable insights and patterns get lost or forgotten.
                </p>
                <p className={"mb-4"}>
                    DevRecall solves that by giving you a dedicated and structured environment to keep track of what you’ve learned, consolidate interview feedback, revisit key topics, and stay sharp.
                </p>

                <h2 className="text-xl font-semibold mb-2">Built by a Developer, for Developers</h2>
                <p className={"mb-2"}>
                    I am a solo developer from Ukraine, building DevRecall out of a personal need to better organize my own learning and interview prep. I’ve poured into it what I wish I had — a frictionless, focused, and customizable space to grow as a developer.
                </p>
                <p className={"mb-4"}>
                    No teams. No fluff. Just a tool that works the way we think and learn as engineers.
                </p>

                <h2 className="text-xl font-semibold mb-2">What You Can Do with DevRecall</h2>
                <ul className="list-disc ml-6 mb-4">
                    <li>Create structured pages by stack (e.g., React, Python, System Design)</li>
                    <li>Write and edit technical notes using a rich markdown-like editor</li>
                    <li>Store interview questions, feedback, and mental models</li>
                    <li>Quickly refresh key concepts before technical interviews</li>
                    <li>Track what you’ve learned and revisit topics when needed</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">What’s Next</h2>
                <p className={"mb-2"}>
                    DevRecall is under active development. Features like spaced repetition, team collaboration, AI-assisted summarization, and mobile support are on the roadmap.
                </p>
                <p className={"mb-4"}>
                    If you have feedback, ideas, or want to collaborate — I’d love to hear from you!
                </p>

                <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
                <p className={"mb-4"}>
                    Email me directly at <a href="mailto:support@devrecall.com" className="text-blue-600 underline">support@devrecall.com</a>
                </p>

            </div>
        </main>
    );
}