import { Link } from "react-router-dom"
import { Button } from "../ui/Button"

const stats = [
    { value: "1000x", label: "Max Multiplier" },
    { value: "12.4k", label: "Active Players" },
    { value: "$2.1M", label: "Payouts / day" },
    { value: "<1s", label: "Avg. Payout" },
]

const sections = [
    {
        tag: "ARCADE",
        title: "Game Arena",
        description:
            "Drop the ball through the pin pyramid, ride the multipliers, and watch your balance climb in real time.",
        cta: "Play now",
        to: "/game",
    },
    {
        tag: "LAB",
        title: "Simulation Lab",
        description:
            "Run thousands of automated rounds and visualize the outcome distribution to fine-tune your risk strategy.",
        cta: "Run a simulation",
        to: "/simulation",
    },
]

export function Home() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            {/* Hero */}
            <section className="flex flex-col items-center text-center">
        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
          Provably Fair • Instant Payouts
        </span>
                <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                    Play Smarter, <span className="text-green-400">Win Greener</span>
                </h1>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-gray-400 sm:text-lg">
                    Drop into provably fair games or run thousands of simulations to test your strategy before
                    you stake. Pick a section below to get started.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                    <Link to="/game">
                        <Button size="lg">Go to Games</Button>
                    </Link>
                    <Link to="/simulation">
                        <Button size="lg" variant="outline">
                            Open Simulation
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Stats */}
            <section className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-white/10 bg-gray-900/60 p-6 text-center"
                    >
                        <p className="text-2xl font-bold text-green-400 sm:text-3xl">{stat.value}</p>
                        <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Sections */}
            <section className="mt-16 grid gap-6 md:grid-cols-2">
                {sections.map((section) => (
                    <div
                        key={section.title}
                        className="flex flex-col rounded-2xl border border-white/10 bg-gray-900/60 p-8"
                    >
            <span className="text-xs font-semibold tracking-widest text-green-400">
              {section.tag}
            </span>
                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">{section.title}</h2>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
                            {section.description}
                        </p>
                        <Link to={section.to} className="mt-6">
                            <Button variant="secondary">{section.cta} →</Button>
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Home