import Logo from "@/components/Logo";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
            <div className="prose max-w-3xl mx-auto text-gray-700">
                <Logo view={"horizontal"} classes={"mb-6"} />
                <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-2">Effective Date: August 1, 2025</p>
                <p className="text-gray-600 mb-6">Last Updated: August 1, 2025</p>
                <p>
                    Welcome to <strong>DevRecall</strong>. This Privacy Policy explains how we collect, use, and protect your information when you use our platform available at
                    <a href="https://devrecall.com" className="text-blue-600 underline ml-1">https://devrecall.com</a>.
                </p>

                <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
                <ul className="list-disc ml-6">
                    <li><strong>Account Information:</strong> Email, name, and preferences you provide during sign-up.</li>
                    <li><strong>Usage Data:</strong> Interactions with the platform, feature usage, and navigation.</li>
                    <li><strong>Technical Info:</strong> Device type, browser, IP address, and referral data.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
                <p>We use the data to:</p>
                <ul className="list-disc ml-6">
                    <li>Provide and maintain the service</li>
                    <li>Personalize your experience and recommendations</li>
                    <li>Monitor platform performance and improve features</li>
                    <li>Communicate updates, tips, and optional offers (only with your consent)</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">3. Data Sharing</h2>
                <p>
                    We do <strong>not</strong> sell your data. We may share limited data with third-party services (e.g., analytics or email tools) solely to help us operate and improve DevRecall.
                </p>

                <h2 className="text-xl font-semibold mt-6">4. Cookies & Tracking</h2>
                <p>
                    We use cookies to maintain sessions, remember preferences, and analyze usage patterns. You can disable cookies in your browser settings, but some features may not function properly.
                </p>

                <h2 className="text-xl font-semibold mt-6">5. Data Security</h2>
                <p>
                    We implement reasonable safeguards to protect your personal data. However, no system is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-xl font-semibold mt-6">6. Your Rights</h2>
                <ul className="list-disc ml-6">
                    <li>You may update or delete your account data at any time.</li>
                    <li>You may request a copy of your stored data.</li>
                    <li>You may withdraw consent to marketing emails at any time.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">7. Children’s Privacy</h2>
                <p>DevRecall is not intended for users under 13. We do not knowingly collect personal data from children under 13 years of age.</p>

                <h2 className="text-xl font-semibold mt-6">8. Changes to This Policy</h2>
                <p>We may revise this Privacy Policy from time to time. We’ll notify you of significant changes through the platform or by email.</p>

                <h2 className="text-xl font-semibold mt-6">9. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at
                    <a href="mailto:support@devrecall.com" className="text-blue-600 underline ml-1">support@devrecall.com</a>.
                </p>
            </div>
        </div>
    );
}