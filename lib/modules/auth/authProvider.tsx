import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../core/supabase/client.supabase';

type AuthContextType = {
    session: Session | null;
    loading: boolean;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: true,
    signInWithEmail: async () => { },
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Intentar recuperar sesión guardada
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('📦 getSession - sesión recuperada:', session ? 'SÍ' : 'NO');
            if (session) console.log('   👤 usuario:', session.user.id);
            setSession(session);
            setLoading(false);
        });

        // 2. Escuchar cambios en la autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('🔄 Auth event:', event, session?.user?.id ?? 'null');
            setSession(session);
            // Si el evento es SIGNED_IN o TOKEN_REFRESHED, podríamos forzar algo
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    return (
        <AuthContext.Provider value={{ session, loading, signInWithEmail, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};