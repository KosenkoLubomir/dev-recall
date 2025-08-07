import Logo from "@/components/Logo";
import React from "react";

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
            <div className="prose max-w-3xl mx-auto text-gray-700">
                <div className={"text-center"}>
                    <Logo classes={"mb-6 justify-center inline-flex"}/>
                </div>
                <h1 className="text-2xl text-center font-bold mb-4">Terms and Conditions</h1>
                <p className="text-gray-600 mb-2">Effective Date: August 1, 2025</p>
                <p className="text-gray-600 mb-6">Last Updated: August 1, 2025</p>
                <p>
                    Welcome to <strong>DevRecall</strong>. These Terms and Conditions (“Terms”) govern your use of our platform available at
                    <a href="https://devrecall.com" className="text-blue-600 underline ml-1">https://devrecall.com</a>.
                    By accessing or using the service, you agree to be bound by these Terms.
                </p>

                <h2 className="text-xl font-semibold mt-6">1. Eligibility</h2>
                <p>You must be at least 13 years old to use DevRecall.</p>

                <h2 className="text-xl font-semibold mt-6">2. User Accounts</h2>
                <p>You’re responsible for keeping your login credentials secure. You may not share your account.</p>

                <h2 className="text-xl font-semibold mt-6">3. Usage Rules</h2>
                <ul className="list-disc ml-6">
                    <li>Use DevRecall for any lawful and constructive purposes only.</li>
                    <li>Do not reverse-engineer, replicate, or copy our service.</li>
                    <li>Do not upload harmful, illegal, or offensive content.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">4. Intellectual Property</h2>
                <p>
                    All content, trademarks, and service marks on DevRecall belong to us or our licensors.
                    You retain rights to the notes and pages you create.
                </p>

                <h2 className="text-xl font-semibold mt-6">5. Termination</h2>
                <p>
                    We may suspend or terminate your access for violating these Terms or for any other reason, with or without notice.
                </p>

                <h2 className="text-xl font-semibold mt-6">6. Disclaimers</h2>
                <p>DevRecall is provided “as is”. We make no guarantees about uptime, accuracy, or performance.</p>

                <h2 className="text-xl font-semibold mt-6">7. Limitation of Liability</h2>
                <p>
                    To the extent permitted by law, we’re not liable for any indirect, incidental, or consequential damages resulting from your use of the service.
                </p>

                <h2 className="text-xl font-semibold mt-6">8. Modifications</h2>
                <p>
                    We may update these Terms at any time. Continued use of the service means you accept the updated Terms.
                </p>

                <h2 className="text-xl font-semibold mt-6">9. Refund Policy</h2>
                <ul className="list-disc ml-6">
                    <li>
                        If you purchase a paid subscription (such as a PRO plan), you are eligible for a full refund within 7 days of the initial purchase - no questions asked.
                    </li>
                    <li>
                        After 7 days, all payments are non-refundable, including renewals and recurring charges.
                    </li>
                    <li>
                        If your payment fails and we are unable to collect it within 7 days, your PRO access will be suspended automatically.
                    </li>
                    <li>
                        To request a refund or cancel your subscription, please contact us at <b>support@devrecall.com</b>.
                    </li>
                    <li>
                        You can also cancel your subscription at any time through your account settings.<br/>
                        Cancellation will prevent future charges, but does not retroactively refund previous payments.<br/>
                        Your PRO access will remain active until the end of your current billing period.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">10. Contact</h2>
                <p>
                    Questions? Reach out at
                    <a href="mailto:support@devrecall.com" className="text-blue-600 underline ml-1">support@devrecall.com</a>.
                </p>
            </div>
        </div>
    );
}