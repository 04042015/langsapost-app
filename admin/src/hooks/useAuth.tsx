import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase'; 
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ Tangkap semua console.log/error/warn
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      originalLog(...args);
      setLogs(prev => [...prev, '📝 LOG: ' + args.join(' ')]);
    };
    console.error = (...args) => {
      originalError(...args);
      setLogs(prev => [...prev, '❌ ERROR: ' + args.join(' ')]);
    };
    console.warn = (...args) => {
      originalWarn(...args);
      setLogs(prev => [...prev, '⚠️ WARN: ' + args.join(' ')]);
    };

    // Tangkap error global
    window.onerror = (msg, src, lineno, colno, error) => {
      setLogs(prev => [...prev, `🔥 UNCAUGHT: ${msg} at ${src}:${lineno}:${colno}`]);
    };

    window.onunhandledrejection = (event) => {
      setLogs(prev => [...prev, `💥 PROMISE REJECTED: ${event.reason}`]);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Sign in attempt:", email);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Login failed:", error.message);
      toast({ title: 'Login gagal', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Login berhasil', description: 'Anda akan diarahkan...' });
    navigate('/dashboard');
  };

  const signUp = async (email: string, password: string) => {
    console.log("Sign up attempt:", email);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Sign up failed:", error.message);
      toast({ title: 'Registrasi gagal', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Registrasi berhasil', description: 'Silakan cek email.' });
  };

  const signOut = async () => {
    console.log("Signing out...");
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signUp, signOut }}>
      {/* ✅ DEBUG LOG UI */}
      <div style={{
        background: '#000',
        color: '#0f0',
        padding: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        maxHeight: '150px',
        overflowY: 'scroll',
        whiteSpace: 'pre-wrap'
      }}>
        {logs.length === 0 ? '📭 No logs yet...' : logs.join('\n')}
      </div>

      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
                      }
