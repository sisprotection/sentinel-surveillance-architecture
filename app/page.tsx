'use client'

import { useMemo, useState } from 'react'
import {
  Aperture,
  ArrowRight,
  BatteryCharging,
  Check,
  ChevronDown,
  Crosshair,
  Download,
  HardHat,
  Lightbulb,
  MapPin,
  Menu,
  Minus,
  Plus,
  Radio,
  RotateCcw,
  ShieldCheck,
  Sun,
  Video,
  Zap,
} from 'lucide-react'

const zones = ['North lot', 'Loading bay', 'Employee entrance', 'South perimeter']
const surfaces = ['Masonry / brick', 'Steel structure', 'Wood frame', 'Mixed surface']

export default function Page() {
  const [business, setBusiness] = useState('Raven & Co. Commercial')
  const [address, setAddress] = useState('1840 Mercer Industrial Way')
  const [selectedZone, setSelectedZone] = useState('North lot')
  const [surface, setSurface] = useState('Masonry / brick')
  const [cameraCount, setCameraCount] = useState(4)
  const [lightingCount, setLightingCount] = useState(6)
  const [nightVision, setNightVision] = useState(true)
  const [solarBackup, setSolarBackup] = useState(true)
  const [notes, setNotes] = useState('Prioritize vehicle identification at the north gate. Keep equipment low-profile.')
  const [submitted, setSubmitted] = useState(false)

  const coverage = useMemo(() => Math.min(99, cameraCount * 18 + lightingCount * 4), [cameraCount, lightingCount])

  return (
    <main className="min-h-screen bg-[#11100c] text-[#d7a73e] selection:bg-[#d7a73e] selection:text-[#11100c]">
      <header className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-[#a97d25] bg-[#17150f]/95 shadow-[0_3px_0_#4d3b19] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.28em] text-[#e0b64d] sm:text-xs">
            <ShieldCheck className="size-5" />
            <span>SECURED BY SERPENT SYSTEMS</span>
          </div>
          <div className="hidden items-center gap-2 text-[10px] tracking-[0.24em] text-[#847043] sm:flex"><span className="size-2 animate-pulse rounded-full bg-[#c79224]" /> PERIMETER LOCKED</div>
          <Menu className="size-5 sm:hidden" />
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 pb-12 pt-24 sm:px-8">
        <section className="mb-8 grid gap-6 border-b border-[#55431c] pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#82682d]"><span className="h-px w-10 bg-[#a97d25]" /> INTAKE PROTOCOL 07-A</div>
            <h1 className="max-w-4xl font-mono text-3xl font-bold uppercase leading-[0.95] tracking-[-0.05em] text-[#f0c65b] sm:text-5xl lg:text-6xl">Sentinel Surveillance<br /><span className="text-[#a78132]">Architecture</span></h1>
            <p className="mt-5 max-w-2xl font-mono text-xs leading-6 text-[#927d51] sm:text-sm">A field-calibrated planning interface for commercial PTZ coverage and solar perimeter illumination. Complete the modules below to generate an initial deployment brief.</p>
          </div>
          <div className="grid grid-cols-2 gap-px border border-[#6d5320] bg-[#6d5320] font-mono text-[10px] uppercase tracking-[0.18em]">
            <div className="bg-[#1c1911] p-4"><div className="mb-2 text-[#77623a]">Signal status</div><div className="flex items-center gap-2 text-[#d7a73e]"><Radio className="size-3" /> Nominal</div></div>
            <div className="bg-[#1c1911] p-4"><div className="mb-2 text-[#77623a]">Brief ID</div><div className="text-[#d7a73e]">SSA-{cameraCount}{lightingCount}-A9</div></div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(330px,0.8fr)]">
          <div className="flex flex-col gap-6">
            <Panel eyebrow="01 / SITE REGISTER" title="Commercial identity & conditions" icon={<MapPin />}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Business / site name"><input value={business} onChange={(e) => setBusiness(e.target.value)} /></Field>
                <Field label="Primary site address"><input value={address} onChange={(e) => setAddress(e.target.value)} /></Field>
                <Field label="Mounting substrate"><Select value={surface} onChange={setSurface} options={surfaces} /></Field>
                <Field label="Priority zone"><Select value={selectedZone} onChange={setSelectedZone} options={zones} /></Field>
              </div>
            </Panel>

            <Panel eyebrow="02 / PTZ ARRAY CONFIGURATION" title="Active camera coverage" icon={<Aperture />}>
              <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-[#493c22] pb-4"><div><div className="text-xs uppercase tracking-[0.18em] text-[#e2b847]">PTZ camera units</div><div className="mt-1 text-[10px] text-[#7e704f]">Motorized pan / tilt / zoom nodes</div></div><Stepper value={cameraCount} setValue={setCameraCount} min={1} max={12} /></div>
                  <Toggle label="Low-light / IR night vision" active={nightVision} onClick={() => setNightVision(!nightVision)} icon={<Video />} />
                  <div className="border border-[#443a23] bg-[#15130e] p-4"><div className="mb-3 flex justify-between text-[10px] uppercase tracking-[0.15em]"><span className="text-[#877348]">Estimated line-of-sight</span><span className="text-[#d7a73e]">{coverage}%</span></div><div className="h-2 bg-[#342b19]"><div className="h-full bg-[#c18d2c] shadow-[0_0_12px_#c18d2c] transition-all" style={{ width: `${coverage}%` }} /></div></div>
                </div>
                <div className="relative min-h-[190px] overflow-hidden border border-[#54421f] bg-[#15130e] p-5"><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#6e5422 1px, transparent 1px), linear-gradient(90deg, #6e5422 1px, transparent 1px)', backgroundSize: '28px 28px' }} /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#93773b]"><span>Coverage simulation</span><Crosshair className="size-4" /></div><div className="relative mx-auto size-32 rounded-full border border-dashed border-[#9f782a]"><div className="absolute inset-5 rounded-full border border-[#806124]" /><div className="absolute left-1/2 top-1/2 h-px w-20 -translate-x-1/2 bg-[#d3a438]" /><div className="absolute left-1/2 top-1/2 h-20 w-px -translate-y-1/2 bg-[#d3a438]" /><div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e4bd50] shadow-[0_0_12px_#e4bd50]" /></div><div className="flex justify-between text-[9px] uppercase tracking-[0.15em] text-[#75613b]"><span>AZ 084°</span><span>FOV 112°</span></div></div></div>
              </div>
            </Panel>

            <Panel eyebrow="03 / SOLAR PERIMETER GRID" title="Illumination placement" icon={<Sun />}>
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div className="flex flex-col gap-5"><div className="flex items-center justify-between border-b border-[#493c22] pb-4"><div><div className="text-xs uppercase tracking-[0.18em] text-[#e2b847]">Solar light fixtures</div><div className="mt-1 text-[10px] text-[#7e704f]">Wall / pole-mounted units</div></div><Stepper value={lightingCount} setValue={setLightingCount} min={1} max={20} /></div><Toggle label="Battery reserve / dusk-to-dawn" active={solarBackup} onClick={() => setSolarBackup(!solarBackup)} icon={<BatteryCharging />} /><div className="grid grid-cols-2 gap-3"><Metric label="Coverage span" value={`${lightingCount * 42} m`} /><Metric label="Reserve window" value={solarBackup ? '72 hr' : '24 hr'} /></div></div>
                <div className="border border-[#54421f] bg-[#15130e] p-5"><div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#93773b]"><Lightbulb className="size-4" /> Recommended nodes</div><div className="flex flex-col gap-3">{['N-01  /  North gate', 'N-02  /  Loading bay', 'S-01  /  South fence'].map((node, i) => <div key={node} className="flex items-center justify-between border-b border-[#342d1d] pb-3 text-[11px] text-[#caa044]"><span>{node}</span><span className="text-[#766341]">{i === 0 ? 'PRIMARY' : 'AUXILIARY'}</span></div>)}</div></div>
              </div>
            </Panel>

            <Panel eyebrow="04 / FIELD NOTES" title="Operational context" icon={<HardHat />}><Field label="Constraints, access notes, or known blind spots"><textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field></Panel>
          </div>

          <aside className="flex flex-col gap-6 xl:sticky xl:top-24 xl:h-fit">
            <div className="border-[3px] border-[#b1842c] bg-[#1b1810] p-5 shadow-[6px_6px_0_#3d3017] sm:p-6"><div className="mb-6 flex items-center justify-between"><div className="text-[10px] font-bold tracking-[0.25em] text-[#e4bb50]">DEPLOYMENT BRIEF</div><Zap className="size-4 text-[#c9992e]" /></div><div className="mb-6 border-b border-[#5c471f] pb-6"><div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#806b3e]">Recommended profile</div><div className="font-mono text-2xl font-bold uppercase text-[#f1c75e]">{cameraCount}-NODE / {lightingCount}-LIGHT</div><div className="mt-2 text-[10px] leading-5 text-[#907846]">Balanced perimeter configuration for {selectedZone.toLowerCase()} priority.</div></div><div className="flex flex-col gap-4 text-[11px] uppercase tracking-[0.14em]">{[['Site', business], ['Surface', surface], ['Night vision', nightVision ? 'Enabled' : 'Manual'], ['Solar reserve', solarBackup ? '72 hours' : '24 hours']].map(([label, value]) => <div className="flex justify-between gap-3 border-b border-[#332c1c] pb-3" key={label}><span className="text-[#806b3e]">{label}</span><span className="max-w-[55%] text-right text-[#d7a73e]">{value}</span></div>)}</div><button onClick={() => setSubmitted(true)} className="mt-7 flex w-full items-center justify-center gap-3 bg-[#bd8b29] px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#17130b] transition hover:bg-[#e0b54c]">{submitted ? <><Check className="size-4" /> Brief queued</> : <>Generate field brief <ArrowRight className="size-4" /></>}</button><button className="mt-3 flex w-full items-center justify-center gap-2 border border-[#5e481e] px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#a0803f] transition hover:border-[#b1842c] hover:text-[#e6bd50]"><Download className="size-3" /> Export intake record</button></div>
            <div className="border border-[#4e3e20] bg-[#17150f] p-5"><div className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#c49635]"><ShieldCheck className="size-4" /> SYSTEM GUARANTEE</div><p className="font-mono text-[10px] leading-5 text-[#806e48]">This planning layer stores all inputs in volatile local session state. No site data leaves this terminal until you authorize a field brief.</p></div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function Panel({ eyebrow, title, icon, children }: { eyebrow: string; title: string; icon: React.ReactNode; children: React.ReactNode }) { return <section className="border border-[#60491d] bg-[#1a1710] shadow-[3px_3px_0_#302613]"><div className="flex items-center gap-3 border-b-2 border-[#9b7426] bg-[#211c10] px-5 py-4"><div className="text-[#d5a73c]">{icon}</div><div><div className="text-[9px] font-bold tracking-[0.25em] text-[#8c6f34]">{eyebrow}</div><h2 className="mt-1 font-mono text-sm font-bold uppercase tracking-[0.08em] text-[#e7bc50]">{title}</h2></div></div><div className="p-5 sm:p-6">{children}</div></section> }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#937846]">{label}{children}</label> }
function Select({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) { return <div className="relative"><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#b1842c]" /></div> }
function Stepper({ value, setValue, min, max }: { value: number; setValue: (value: number) => void; min: number; max: number }) { return <div className="flex items-center border border-[#654d20] bg-[#12110d]"><button aria-label="Decrease" onClick={() => setValue(Math.max(min, value - 1))} className="p-2 text-[#9d792e] hover:bg-[#2b2414]"><Minus className="size-3" /></button><span className="min-w-9 text-center font-mono text-lg text-[#e8bc4d]">{String(value).padStart(2, '0')}</span><button aria-label="Increase" onClick={() => setValue(Math.min(max, value + 1))} className="p-2 text-[#9d792e] hover:bg-[#2b2414]"><Plus className="size-3" /></button></div> }
function Toggle({ label, active, onClick, icon }: { label: string; active: boolean; onClick: () => void; icon: React.ReactNode }) { return <button onClick={onClick} className="flex items-center justify-between border border-[#493c22] bg-[#15130e] p-3 text-left transition hover:border-[#92702a]"><span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-[#b18d45]">{icon}{label}</span><span className={`flex h-5 w-9 items-center rounded-full p-1 transition ${active ? 'bg-[#ae8028] justify-end' : 'justify-start bg-[#3d321d]'}`}><span className="size-3 rounded-full bg-[#1a1710]" /></span></button> }
function Metric({ label, value }: { label: string; value: string }) { return <div className="border border-[#493c22] p-3"><div className="text-[9px] uppercase tracking-[0.14em] text-[#806b3e]">{label}</div><div className="mt-2 font-mono text-lg text-[#d9ad42]">{value}</div></div> }

