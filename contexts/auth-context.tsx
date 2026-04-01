"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Kiểm tra session hiện có khi app khởi động
    supabase.auth.getUser().then(({ data: { user: sbUser } }) => {
      if (sbUser) {
        setUser({
          id: sbUser.id,
          email: sbUser.email!,
          name: sbUser.user_metadata?.name ?? sbUser.email!.split("@")[0],
          avatar: sbUser.user_metadata?.avatar_url,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Lắng nghe thay đổi session (login, logout, refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const sbUser = session?.user
      if (sbUser) {
        setUser({
          id: sbUser.id,
          email: sbUser.email!,
          name: sbUser.user_metadata?.name ?? sbUser.email!.split("@")[0],
          avatar: sbUser.user_metadata?.avatar_url,
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    // Không cần setUser ở đây — onAuthStateChange tự cập nhật
  }

  const register = async (name: string, email: string, password: string) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // lưu tên vào user_metadata
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) throw new Error(error.message)
  }

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    // onAuthStateChange tự set user = null
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
