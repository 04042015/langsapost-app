import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [debug, setDebug] = useState<string[]>([])

  function addDebug(message: string, data?: any) {
    setDebug(prev => [...prev, `${message}: ${JSON.stringify(data, null, 2)}`])
    console.log(message, data)
  }

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) addDebug('Session Error', error)
        if (data?.session) {
          setUser(data.session.user)
          addDebug('Session Data', data.session.user)
        }
        setLoading(false)
      })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        addDebug('Auth State Change', session?.user)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) addDebug('Sign In Error', error)
    if (data?.user) {
      setUser(data.user)
      addDebug('Sign In Success', data.user)
    }
    setLoading(false)
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) addDebug('Sign Up Error', error)
    if (data?.user) {
      setUser(data.user)
      addDebug('Sign Up Success', data.user)
    }
    setLoading(false)
  }

  return { user, loading, signIn, signUp, debug }
}
