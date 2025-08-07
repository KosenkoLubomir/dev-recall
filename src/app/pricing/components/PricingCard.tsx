'use client';

import Button from "@/components/Button";
import React from "react";
import { useRouter } from "next/navigation";

type PricingCardProps = {
    title: string;
    price: string;
    features: string[];
    cta: string;
    highlight?: boolean;
};

function PricingCard({ title, price, features, cta, highlight }: PricingCardProps) {

    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const handlePlanSelect = () => {
        setLoading(true);
        if (highlight) {
            // Additional logic for highlighted plan if needed
            console.log(`Highlighted plan selected: ${title}`);
        } else {
            // Logic for non-highlighted plan
            console.log(`Standard plan selected: ${title}`);
            router.push("/auth/signup");
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    return (
        <div className={`border flex flex-col justify-between rounded-lg p-6 shadow-sm ${highlight ? 'border-blue-500' : 'border-gray-200'}`}>
            <div>
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-3xl font-bold mb-4">{price}</p>
                <ul className="space-y-2 mb-6">
                    {features.map((f, i) => (
                        <li key={i} className="text-gray-700 flex items-center">
                            ✅ <span className="ml-2">{f}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"text-center"}>
                <Button onClick={handlePlanSelect} type={"button"} view={highlight ? "primary" : "secondary"} disabled={loading}>{cta}</Button>
            </div>
        </div>
    );
}

export default PricingCard;