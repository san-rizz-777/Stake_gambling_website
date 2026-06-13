import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const links: { to: string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/game", label: "Game" },
  { to: "/simulation", label: "Simulation" },
]

export function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
      <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-green-500 font-bold text-gray-950">
            P
          </span>
            <span className="text-lg font-semibold tracking-tight text-white">
            PGreen<span className="text-green-400">Play</span>
          </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 sm:flex">
            {links.map((link) => {
              const active = pathname === link.to
              return (
                  <Link
                      key={link.to}
                      to={link.to}
                      className={
                          "rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                          (active
                              ? "bg-green-500/10 text-green-400"
                              : "text-gray-300 hover:bg-white/5 hover:text-white")
                      }
                  >
                    {link.label}
                  </Link>
              )
            })}
          </div>

          {/* Auth */}
          {user ? (
              <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">
              Welcome, <span className="font-semibold text-green-400">{user.username}</span>
            </span>
                <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
          ) : (
              <Link
                  to="/login"
                  className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-green-400"
              >
                Sign in
              </Link>
          )}
        </nav>
      </header>
  )
}

export default Navbar