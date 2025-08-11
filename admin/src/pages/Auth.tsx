import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthPage() {
  const { signIn, signUp, debug } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', color: '#fff' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
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
      <div style={{ background: '#fff', padding: '10px', marginTop: '20px', color: '#000' }}>
        <h4>Debug Output</h4>
        {debug.length === 0 && <p>Tidak ada log</p>}
        {debug.map((line, i) => (
          <pre key={i} style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>{line}</pre>
        ))}
      </div>
    </div>
  )
}
