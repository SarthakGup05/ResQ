// components/dashboard/DashboardMap.tsx
import { MapPin, Crosshair, Navigation, LocateFixed } from "lucide-react";

interface DashboardMapProps {
    label: string;
}

export default function DashboardMap({ label }: DashboardMapProps) {
    return (
        <div className="relative w-full aspect-video bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden group">
            {/* Dark Tactical Grid Background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Radar Scan Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-red-900/10 to-transparent w-[200%] h-[200%] -top-1/2 -left-1/2 animate-spin-slow opacity-30 pointer-events-none"></div>

            {/* Pulsing Alert Zones */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 border border-red-900/40 rounded-full animate-ping-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-48 h-48 border border-red-500/20 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* HUD Elements */}
            <div className="absolute top-3 right-3 flex gap-2">
                <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-1.5 rounded-md text-red-500 animate-pulse">
                    <LocateFixed className="w-4 h-4" />
                </div>
            </div>

            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur px-2 py-1 rounded border border-slate-700 text-[10px] font-mono text-slate-400">
                LAT: 35.6586 <br /> LNG: 139.7454
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Central Pin */}
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-md animate-pulse"></div>
                    <MapPin className="h-10 w-10 text-red-500 relative z-20 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-red-500/50 rounded-full blur-[4px]"></div>
                </div>
            </div>

            {/* Label Overlay */}
            <div className="absolute top-3 left-3 bg-red-950/80 border border-red-900/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-red-200 tracking-wider uppercase">{label}</span>
            </div>
        </div>
    );
}
