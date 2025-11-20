import { useState } from 'react'

export default function GlitchButton({ children, onClick, className = '' }) {
  const [hover, setHover] = useState(false)

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/10 text-cyan-200 border border-cyan-400/30 hover:bg-cyan-500/20 transition-all duration-200 ${className}`}
      style={{
        boxShadow: hover ? '0 0 24px rgba(0,240,255,0.25)' : '0 0 0 rgba(0,0,0,0)'
      }}
    >
      <span className="relative z-10 font-semibold tracking-wide">{children}</span>
      {/* glitch lines */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <span className={`absolute left-0 top-0 h-[2px] w-full bg-cyan-400/60 ${hover ? 'animate-pulse' : ''}`} />
        <span className={`absolute right-0 bottom-0 h-[2px] w-full bg-purple-400/60 ${hover ? 'animate-pulse' : ''}`} />
      </span>
    </button>
  )
}
