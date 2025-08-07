
import React from 'react';
import PricingCard from '@/app/pricing/components/PricingCard';
import Logo from "@/components/Logo";

export default function PricingPage() {
    return (
        <main className="max-w-4xl mx-auto py-16 px-4">
            <div className={"text-center"}>
                <Logo classes={"mb-6 justify-center inline-flex"}/>
            </div>

            <h1 className="text-4xl font-bold text-center mb-4">Pricing</h1>
            <p className="text-center text-gray-500 mb-12">Simple pricing. No hidden fees.</p>

            <div className="grid md:grid-cols-2 gap-8">
                <PricingCard
                    title="Free"
                    price="0"
                    features={[
                        "Up to 5 folders",
                        "Up to 5 pages per folder",
                        "Access to basic editor",
                        "Tech support",
                    ]}
                    cta="Get Started"
                    highlight={false}
                />

                <PricingCard
                    title="PRO"
                    price="$7/month"
                    features={[
                        "Unlimited folders",
                        "Unlimited pages",
                        "AI-powered content generation",
                        "Priority support",
                        "Early access to new features",
                    ]}
                    cta="Start with PRO"
                    highlight={true}
                />
            </div>
        </main>
    );
}