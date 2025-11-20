import { useEffect, useRef } from 'react'

export default function ParticleField({ color = 'rgba(0,240,255,0.5)' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrame

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      canvas.width = canvas.clientWidth * DPR
      canvas.height = canvas.clientHeight * DPR
    }

    window.addEventListener('resize', resize)
    resize()

    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2
    }))

    const binaries = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.3 + Math.random() * 0.6,
      char: Math.random() > 0.5 ? '0' : '1'
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const size = 1 + p.z * 1.5
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      // binary rain
      ctx.font = `${12 * DPR}px Geist Mono, ui-monospace, SFMono-Regular, Menlo`
      ctx.fillStyle = 'rgba(0,240,255,0.35)'
      binaries.forEach(b => {
        b.y += b.speed * DPR
        if (b.y > canvas.height + 20) {
          b.y = -20
          b.x = Math.random() * canvas.width
        }
        ctx.fillText(b.char, b.x, b.y)
      })

      animationFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [color])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}
