import { Link, useLocation } from "react-router-dom"

const links: { to: string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/game", label: "Game" },
  { to: "/simulation", label: "Simulation" },
]

export function Navbar() {
  const { pathname } = useLocation()

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
          <Link
              to="/login"
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-green-400"
          >
            Sign in
          </Link>
        </nav>
      </header>
  )
}

export default Navbar