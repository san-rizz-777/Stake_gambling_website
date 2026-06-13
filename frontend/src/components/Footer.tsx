export function Footer() {
  return (
      <footer className="border-t border-white/10 bg-gray-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center sm:px-6">
          <p className="text-sm font-semibold text-green-400">Plinkoo.100x</p>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
            Experience the thrill of Plinko with provably fair gameplay, instant payouts, and
            customizable risk levels. Your trusted destination for online gaming.
          </p>
          <p className="mt-2 text-xs text-gray-600">
            &copy; {new Date().getFullYear()} PGreenPlay. All rights reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer