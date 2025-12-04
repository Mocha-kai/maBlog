'use client';

import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton({ isLogin }: { isLogin: (check: boolean) => void }) {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) isLogin(true);
        else isLogin(false);
    }, [session, isLogin]);

    if (session) {
        return (
            <button onClick={() => signOut()} className="blog-login-btn">
                Logout
            </button>
        );
    }
    return (
        <button onClick={() => signIn('github')} className="blog-login-btn">
            Login(GiT)
        </button>
    );
}
