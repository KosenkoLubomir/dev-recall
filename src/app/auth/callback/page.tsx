// 'use client';
//
// import { useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
//
// export default function AuthCallbackPage() {
//     const supabase = createClientComponentClient();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//
//     useEffect(() => {
//         const code = searchParams.get('code');
//
//         if (code) {
//             const handleAuth = async () => {
//                 const { error } = await supabase.auth.exchangeCodeForSession(code);
//
//                 if (error) {
//                     console.error('Session exchange failed:', error.message);
//                 } else {
//                     router.push('/dashboard');
//                 }
//             };
//
//             handleAuth();
//         }
//     }, [searchParams, supabase, router]);
//
//     return (
//         <div className="min-h-screen flex items-center justify-center text-gray-600">
//             <p>Finalizing login...</p>
//         </div>
//     );
// }