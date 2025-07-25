export default function CheckEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Check your email</h2>
                <p className="text-gray-600 mb-6">
                    We have sent a confirmation email to your inbox.
                    Please click the link in that email to verify your account.
                </p>
                <p className="text-sm text-gray-500">
                    Did not get the email? Make sure to check your spam folder.
                </p>
            </div>
        </div>
    );
}