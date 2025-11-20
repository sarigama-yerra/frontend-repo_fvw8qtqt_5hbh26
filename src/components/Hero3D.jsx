import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] rounded-3xl overflow-hidden border border-cyan-500/10 bg-[#050505]">
      <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      {/* glow overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-600/10" />
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(600px 200px at 20% 0%, rgba(0,240,255,0.12), transparent), radial-gradient(500px 180px at 80% 100%, rgba(188,19,254,0.12), transparent)'
      }} />
    </div>
  );
}
