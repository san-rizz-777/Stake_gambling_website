import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"

export function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)

        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Sign up failed")
            }

            const { token, user } = await response.json()

            // Store token in localStorage
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))

            // Redirect to home
            navigate("/")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Sign up failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-green-500 text-xl font-bold text-gray-950">
            P
          </span>
                    <h1 className="text-3xl font-bold tracking-tight text-green-400">Create your account</h1>
                    <p className="mt-2 text-sm text-gray-400">Join PGreenPlay and start playing in seconds.</p>
                </div>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-white/10 bg-gray-900/60 p-6 shadow-xl shadow-black/20 sm:p-8"
                >
                    {error && (
                        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Name */}
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="h-11 w-full rounded-lg border border-white/10 bg-gray-950/60 px-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-green-500/60"
                        />
                    </div>

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
                    <div className="mb-5">
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="h-11 w-full rounded-lg border border-white/10 bg-gray-950/60 px-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-green-500/60"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-300">
                            Confirm password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="h-11 w-full rounded-lg border border-white/10 bg-gray-950/60 px-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-green-500/60"
                        />
                    </div>

                    <Button type="submit" fullWidth size="lg" className="mt-6" disabled={loading}>
                        {loading ? "Creating account..." : "Create account"}
                    </Button>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-green-400 hover:text-green-300">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default Signup