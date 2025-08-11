// admin/src/hooks/useAuth.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'editor' | 'penulis';
  avatar_url?: string;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  logActivity: (type: string, description: string, metadata?: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchProfile = async (userId: string) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
    } else {
      setProfile(profile);
    }

    setLoading(false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (!error) {
      toast({
        title: "Login berhasil",
        description: "Selamat datang kembali!",
      });
      navigate('/dashboard'); // langsung redirect
    }

    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = import.meta.env.VITE_SITE_URL;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      toast({
        title: "Registrasi gagal",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }

    if (data.user) {
      const userId = data.user.id;

      if (!userId) {
        toast({
          title: "Gagal menyimpan profil",
          description: "User ID tidak ditemukan.",
          variant: "destructive",
        });
        return { error: new Error("User ID kosong") };
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        email,
        full_name: fullName,
        role: 'penulis',
      });

      if (profileError) {
        toast({
          title: "Gagal menyimpan profil",
          description: profileError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registrasi berhasil",
          description: "Akun Anda berhasil dibuat!",
        });
      }
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
    toast({
      title: "Logout berhasil",
      description: "Sampai jumpa lagi!",
    });
    navigate('/auth');
  };

  const logActivity = async (type: string, description: string, metadata?: any) => {
    if (!user) return;

    await supabase.from('activity_logs').insert({
      user_id: user.id,
      activity_type: type as any,
      description,
      metadata,
      ip_address: null,
      user_agent: navigator.userAgent,
    });
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    logActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
      }
