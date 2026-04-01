"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import { motion } from "framer-motion"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setError("Google login coming soon!")
  }

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_12px_0_0_rgba(24,24,28,0.12)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#5ecde6]/25" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#ffb82e]/18" />

        <h1 className="relative text-center text-2xl font-black tracking-tight text-[#111116]">
          Login
        </h1>
        <p className="relative mt-2 text-center text-sm font-semibold text-[#111116]/60">
          Welcome back!
        </p>

        {error && (
          <div className="relative mt-4 rounded-2xl bg-red-100 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-extrabold text-[#111116]">
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-[#111116]/50" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full rounded-2xl border-0 bg-[#eaf0f2] py-3 pl-10 pr-4 text-[#111116] placeholder:text-[#111116]/45 outline-none ring-0 focus:bg-[#fdfcf6]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-extrabold text-[#111116]">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-[#111116]/50" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full rounded-2xl border-0 bg-[#eaf0f2] py-3 pl-10 pr-12 text-[#111116] placeholder:text-[#111116]/45 outline-none ring-0 focus:bg-[#fdfcf6]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#111116]/55 hover:text-[#111116]"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-0 accent-[#111116]"
              />
              <span className="text-sm font-semibold text-[#111116]/60">Remember me</span>
            </label>

            <Link href="/forgot-password" className="text-sm font-bold text-[#111116] hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90"
          >
            {isLoading ? "Processing..." : "Login"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 font-extrabold tracking-widest text-[#111116]/45">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full rounded-2xl border-0 bg-[#ffb82e] font-extrabold text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.12)] hover:bg-[#ffb82e]/90"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Login with Google
        </Button>

        <p className="mt-6 text-center text-sm font-semibold text-[#111116]/60">
          Don't have an account?{" "}
          <Link href="/register" className="font-black text-[#111116] hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Password does not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)

    try {
      await register(name, email, password)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại. Thử lại nhé!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = () => {
    setError("Google registration coming soon!")
  }

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_12px_0_0_rgba(24,24,28,0.12)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#5ecde6]/25" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#ffb82e]/18" />

        <h1 className="relative text-center text-2xl font-black tracking-tight text-[#111116]">
          Create an account
        </h1>
        <p className="relative mt-2 text-center text-sm font-semibold text-[#111116]/60">
          Start your journey to conquer TOEIC
        </p>

        {error && (
          <div className="relative mt-4 rounded-2xl bg-red-100 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {success ? (
          <div className="relative mt-4 rounded-2xl bg-green-50 border border-green-200 p-4 text-center">
            <h3 className="mb-2 font-black text-green-800">Registration successful! 🎉</h3>
            <p className="mb-4 text-sm font-semibold text-green-700">
              Please check your email inbox (<b>{email}</b>) and click the confirmation link.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="w-full rounded-2xl bg-green-700 font-extrabold text-white hover:bg-green-800"
            >
              Go to login page
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-extrabold text-[#111116]">
                Full name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-[#111116]/50" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  required
                  className="w-full rounded-2xl border-0 bg-[#eaf0f2] py-3 pl-10 pr-4 text-[#111116] placeholder:text-[#111116]/45 outline-none ring-0 focus:bg-[#fdfcf6]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-extrabold text-[#111116]">
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-[#111116]/50" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-2xl border-0 bg-[#eaf0f2] py-3 pl-10 pr-4 text-[#111116] placeholder:text-[#111116]/45 outline-none ring-0 focus:bg-[#fdfcf6]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-extrabold text-[#111116]">
                Password ({'>='}6 characters)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-[#111116]/50" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full rounded-2xl border-0 bg-[#eaf0f2] py-3 pl-10 pr-12 text-[#111116] placeholder:text-[#111116]/45 outline-none ring-0 focus:bg-[#fdfcf6]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#111116]/55 hover:text-[#111116]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-extrabold text-[#111116]">
                Confirm password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-[#111116]/50" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="w-full rounded-2xl border-0 bg-[#eaf0f2] py-3 pl-10 pr-12 text-[#111116] placeholder:text-[#111116]/45 outline-none ring-0 focus:bg-[#fdfcf6]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#111116]/55 hover:text-[#111116]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90"
            >
              {isLoading ? "Loading..." : "Sign up"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 font-extrabold tracking-widest text-[#111116]/45">Or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleRegister}
              className="w-full rounded-2xl border-0 bg-[#ffb82e] font-extrabold text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.12)] hover:bg-[#ffb82e]/90"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Register with Google
            </Button>
          </form>
        )}

        {success ? null : (
          <p className="mt-6 text-center text-sm font-semibold text-[#111116]/60">
            Already have an account?{" "}
            <Link href="/login" className="font-black text-[#111116] hover:underline">
              Login
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  )
}
