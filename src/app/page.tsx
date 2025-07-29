
// app/page.tsx

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Button from "@/components/Button";
import {
    FolderKanban,
    Bookmark,
    BrainCircuit,
    BellRing,
    Globe,
    Users,
    PenSquare,
} from 'lucide-react';

export default function LandingPage() {

    const features = [
            {
                icon: <FolderKanban className="w-8 h-8 text-blue-600" />,
                title: 'Structured Folders & Pages',
                desc: 'Organize by topic, tech, or project',
            },
            {
                icon: <Bookmark className="w-8 h-8 text-blue-600" />,
                title: 'Save Videos & Resources',
                desc: 'Quickly bookmark and revisit helpful links',
            },
            {
                icon: <BrainCircuit className="w-8 h-8 text-blue-600" />,
                title: 'Self-Check Quizzes',
                desc: 'Test your understanding with custom questions',
            },
            {
                icon: <BellRing className="w-8 h-8 text-blue-600" />,
                title: 'Stay Up-to-Date',
                desc: 'Get notified when tools in your stack update',
            },
            {
                icon: <Globe className="w-8 h-8 text-blue-600" />,
                title: 'Public or Private Notes',
                desc: 'Share ideas or keep your growth personal',
            },
            {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: 'Dev Community',
                desc: 'Connect with like-minded developers',
            },
            {
                icon: <PenSquare className="w-8 h-8 text-blue-600" />,
                title: 'Write & Publish Posts',
                desc: 'Document your journey or teach others',
            },
        ];

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar/>

            <section className="px-6 py-16 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">Your Personal Technical Knowledge Hub</h1>
                <p className="text-lg text-gray-600 mb-6">
                    DevRecall helps you organize, revisit, and grow your technical skills — whether you are prepping for interviews, working on a side project, or leveling up at your job
                </p>

                <Button type={"link"} size={"lg"} view={"primary"} href={"/auth/signup"}>Join DevRecall</Button>

            </section>

            <section className={"py-4"} style={{ backgroundColor: "rgb(217,211,204)", boxShadow: "0 5px 10px -2px rgba(0,0,0,0.1) inset, 0 -5px 10px -2px rgba(0,0,0,0.1) inset" }}>
                <Image src={"/images/hero.webp"} alt="hero image" width={600} height={400} className="mx-auto"/>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-4">Knowledge slips away by time — Keep your brain keen!</h3>
                    <h4 className="text-gray-600 mb-8 text-xl">
                        Without a system, your insights, feedback, and learning fade. DevRecall helps you capture and resurface what matters.
                    </h4>

                    <div className="max-w-xl mx-auto font-semibold">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-blue-600 text-xl">📂</span>
                            <p className="text-gray-700 ">Notes scattered across Notion, Google Docs, and bookmarks</p>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-blue-600 text-xl">🧾</span>
                            <p className="text-gray-700">Technical feedback from interviews gets forgotten</p>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-blue-600 text-xl">🧠</span>
                            <p className="text-gray-700">No single place to track your learning history</p>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-blue-600 text-xl">⏱️</span>
                            <p className="text-gray-700">Hard to quickly refresh key concepts when you need them</p>
                        </div>
                        <div className="flex items-start gap-3 sm:col-span-2">
                            <span className="text-blue-600 text-xl">📉</span>
                            <p className="text-gray-700">Context switching erodes your mental map of tech topics</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-neutral-100 px-6 py-16 text-center" id="features" style={{boxShadow: "0 5px 10px -2px rgba(0,0,0,0.1) inset, 0 -5px 10px -2px rgba(0,0,0,0.1) inset" }}>
                <h2 className="text-3xl font-bold mb-8">DevRecall gives you superpowers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto items-center">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow w-full"
                        >
                            <div className="flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-sm mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-8">Onboarding made simple</h3>

                    <div className="relative border-l-3 border-blue-200 ml-6 space-y-8 text-left mb-16 pl-0.5">
                        {[
                            'Choose your role and experience level',
                            'Select the tech stack you use',
                            'Pick your privacy settings',
                            'Start organizing and learning smarter',
                        ].map((step, index) => (
                            <div key={index} className="relative pl-8">
                                <div className="absolute -left-5 -top-1 w-8 h-8 rounded-full border-2 border-blue-500 bg-white text-blue-600 flex items-center justify-center font-semibold text-sm">
                                    {index + 1}
                                </div>
                                <p className="text-gray-700 font-semibold">{step}</p>
                            </div>
                        ))}
                    </div>

                    <Button type={"link"} size={"lg"} view={"primary"} href={"/auth/signup"}>Start for Free</Button>
                </div>
            </section>

            <footer className="bg-stone-900 text-white px-6 py-6 text-center text-sm">
                <p>&copy; 2025 DevRecall. Built for developers who never stop learning.</p>
            </footer>
        </div>
    );
}
