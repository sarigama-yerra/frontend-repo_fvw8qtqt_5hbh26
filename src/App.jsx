import { useMemo } from 'react'
import Hero3D from './components/Hero3D'
import ParticleField from './components/ParticleField'
import DecryptText from './components/DecryptText'
import GlitchButton from './components/GlitchButton'

const sections = [
  { id: 'about', title: 'About', color: 'cyan' },
  { id: 'skills', title: 'Skills', color: 'purple' },
  { id: 'projects', title: 'Projects', color: 'amber' },
]

function SectionCard({ id, title, children, accent = 'cyan' }) {
  const accents = useMemo(() => ({
    cyan: { ring: 'ring-cyan-400/30', from: 'from-cyan-500/10', to: 'to-cyan-500/0', text: 'text-cyan-200' },
    purple: { ring: 'ring-purple-400/30', from: 'from-purple-500/10', to: 'to-purple-500/0', text: 'text-purple-200' },
    amber: { ring: 'ring-amber-400/30', from: 'from-amber-500/10', to: 'to-amber-500/0', text: 'text-amber-200' }
  }), [])

  const a = accents[accent] || accents.cyan

  return (
    <section id={id} className={`relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ${a.ring} overflow-hidden`}>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${a.from} ${a.to}`} />
      <div className="relative p-8 md:p-12">
        <h2 className={`text-3xl md:text-4xl font-semibold ${a.text} mb-6`}>
          <DecryptText text={title} />
        </h2>
        <div className="text-slate-200/90 leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* Ambient particles and binary rain */}
      <div className="fixed inset-0 -z-0">
        <ParticleField />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_10%_-10%,rgba(0,240,255,0.08),transparent),radial-gradient(800px_300px_at_90%_110%,rgba(188,19,254,0.08),transparent)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_22px_rgba(0,240,255,0.8)]" />
          <span className="font-semibold tracking-wider text-cyan-200">Digital Fortress</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#about" className="hover:text-cyan-200 transition-colors">About</a>
          <a href="#skills" className="hover:text-cyan-200 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyan-200 transition-colors">Projects</a>
        </nav>
        <GlitchButton>Contact</GlitchButton>
      </header>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mt-2">
          <Hero3D />
        </div>

        <div className="relative -mt-24 md:-mt-40 grid gap-6 md:gap-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <SectionCard id="about" title="About" accent="cyan">
              <p className="mb-4">Cybersecurity engineer focused on SOC operations, GRC frameworks, and resilient systems. I design secure architectures, build detection pipelines, and translate risk into action.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-300/90">
                {['NIST CSF', 'MITRE ATT&CK', 'Linux', 'Python', 'TCP/IP', 'Threat Hunting', 'SIEM', 'Cloud Sec'].map((t) => (
                  <div key={t} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors">
                    {t}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <GlitchButton>Download Resume</GlitchButton>
                <GlitchButton className="bg-purple-500/10 border-purple-400/30 text-purple-200">Connect</GlitchButton>
              </div>
            </SectionCard>

            <SectionCard id="skills" title="Skills Graph" accent="purple">
              <SkillGraph />
            </SectionCard>

            <SectionCard id="projects" title="Mission Logs" accent="amber">
              <ProjectFiles />
            </SectionCard>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center text-slate-400">
        <p>© {new Date().getFullYear()} Digital Fortress • SOC / GRC / CS</p>
      </footer>
    </div>
  )
}

function SkillGraph() {
  const nodes = [
    { id: 'Python', x: 20, y: 40 },
    { id: 'Linux', x: 55, y: 25 },
    { id: 'TCP/IP', x: 75, y: 55 },
    { id: 'NIST', x: 35, y: 70 },
    { id: 'SIEM', x: 48, y: 50 },
    { id: 'ATT&CK', x: 65, y: 30 },
  ]
  const links = [
    ['Python', 'SIEM'],
    ['Linux', 'SIEM'],
    ['SIEM', 'ATT&CK'],
    ['NIST', 'SIEM'],
    ['TCP/IP', 'SIEM']
  ]
  return (
    <div className="relative h-72 md:h-80">
      <svg className="absolute inset-0 w-full h-full">
        {links.map(([a, b], i) => {
          const A = nodes.find(n => n.id === a)
          const B = nodes.find(n => n.id === b)
          return (
            <line key={i} x1={`${A.x}%`} y1={`${A.y}%`} x2={`${B.x}%`} y2={`${B.y}%`} stroke="rgba(0,240,255,0.5)" strokeWidth="1.5">
              <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/>
            </line>
          )
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={`${n.x}%`} cy={`${n.y}%`} r="8" fill="rgba(0,240,255,0.15)" stroke="rgba(0,240,255,0.6)" strokeWidth="1.5" />
            <text x={`${n.x + 2}%`} y={`${n.y - 2}%`} className="fill-cyan-200" fontSize="12" fontFamily="Geist Mono, ui-monospace">{n.id}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function ProjectFiles() {
  const items = [
    { title: 'SOC Playbook Automation', tag: 'Python' },
    { title: 'Risk Register Tracker', tag: 'GRC' },
    { title: 'Network Anomaly Detector', tag: 'Detection' },
  ]
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((it) => (
        <div key={it.title} className="group relative p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-colors">
          <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{
            background: 'linear-gradient(120deg, rgba(255,193,7,0.12), transparent 40%, rgba(255,193,7,0.12))'
          }} />
          <div className="relative flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">{it.title}</h4>
              <p className="text-sm text-slate-400">Case File • {it.tag}</p>
            </div>
            <GlitchButton className="bg-amber-500/10 border-amber-400/30 text-amber-200">Open</GlitchButton>
          </div>
        </div>
      ))}
    </div>
  )
}
