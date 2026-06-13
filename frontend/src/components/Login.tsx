import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/Button"
import { useNavigate } from "react-router-dom"


export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      const { token, user } = await response.json()

      // Store token in localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect to home or game
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }

    console.log({ email, password })
  }

  return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-green-500 text-xl font-bold text-gray-950">
            P
          </span>
            <h1 className="text-3xl font-bold tracking-tight text-green-400">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-400">Sign in to keep playing and track your wins.</p>
          </div>

          {/* Card */}
          <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-gray-900/60 p-6 shadow-xl shadow-black/20 sm:p-8"
          >
            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-white/10 bg-gray-950/60 px-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-green-500/60"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <button type="button" className="text-xs font-medium text-green-400 hover:text-green-300">
                  Forgot password?
                </button>
              </div>
              <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-white/10 bg-gray-950/60 px-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-green-500/60"
              />
            </div>

            <Button type="submit" fullWidth size="lg" className="mt-6">
              Sign in
            </Button>

            <p className="mt-6 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-semibold text-green-400 hover:text-green-300">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </main>
  )
}

export default Login