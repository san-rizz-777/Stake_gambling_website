import { forwardRef } from "react"
import type { ButtonHTMLAttributes } from "react"

type Variant = "primary" | "secondary" | "ghost" | "outline"
type Size = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"

const variants: Record<Variant, string> = {
  primary: "bg-green-500 text-gray-950 hover:bg-green-400",
  secondary: "bg-gray-800 text-gray-100 hover:bg-gray-700 border border-white/10",
  outline: "border border-green-500/40 text-green-400 hover:bg-green-500/10",
  ghost: "text-gray-300 hover:text-white hover:bg-white/5",
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
}

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", fullWidth, className, ...props }, ref) => {
      return (
          <button
              ref={ref}
              className={cx(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
              {...props}
          />
      )
    },
)

Button.displayName = "Button"

export default Button