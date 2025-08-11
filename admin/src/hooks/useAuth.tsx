import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Ambil session saat komponen pertama kali load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error fetching session:", error);
        alert(`Error fetching session: ${error.message}`);
      }
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Dengarkan perubahan auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Login berhasil" });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Something went wrong:", error);
      alert(`Something went wrong: ${error?.message || JSON.stringify(error)}`);
      toast({ title: "Login gagal", description: error?.message || "Unknown error", variant: "destructive" });
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast({ title: "Registrasi berhasil, silakan cek email konfirmasi" });
    } catch (error: any) {
      console.error("Something went wrong:", error);
      alert(`Something went wrong: ${error?.message || JSON.stringify(error)}`);
      toast({ title: "Registrasi gagal", description: error?.message || "Unknown error", variant: "destructive" });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: "Logout berhasil" });
      navigate("/auth");
    } catch (error: any) {
      console.error("Something went wrong:", error);
      alert(`Something went wrong: ${error?.message || JSON.stringify(error)}`);
      toast({ title: "Logout gagal", description: error?.message || "Unknown error", variant: "destructive" });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
