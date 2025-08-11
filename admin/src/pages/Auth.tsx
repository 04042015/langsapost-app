import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const { signIn, signUp, logs } = useAuth(); // ⬅️ ambil logs dari context
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', color: '#fff' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      >
        {isLogin ? 'Belum punya akun? Register' : 'Sudah punya akun? Login'}
      </button>

      {/* Debug box */}
      <div style={{ background: '#000', padding: '10px', marginTop: '20px', color: '#0f0', fontFamily: 'monospace', fontSize: '12px' }}>
        <h4>Debug Output</h4>
        {logs.length === 0 && <p>📭 Tidak ada log</p>}
        {logs.map((line, i) => (
          <pre key={i} style={{ whiteSpace: 'pre-wrap' }}>{line}</pre>
        ))}
      </div>
    </div>
  );
            }
