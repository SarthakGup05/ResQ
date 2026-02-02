// app/[lang]/dashboard/page.tsx
import { processLiveAlert, AlertData, translateDashboardUI } from "@/lib/resq-engine";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMap from "@/components/dashboard/DashboardMap";
import LiveAlertCard from "@/components/dashboard/LiveAlertCard";
import ActionButtons from "@/components/dashboard/ActionButtons";

// Mock Data: In a real app, this comes from your Government Feed API
const INCOMING_FEED: AlertData = {
    id: "DE-584-B",
    message: "Flash flood warning. Evacuate to high ground immediately.",
    severity: "critical",
    location: {
        lat: 35.6586,
        lng: 139.7454,
        name: "Minato City District"
    }
};

export default async function Dashboard({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    // 1. Detect Language from URL Params
    const { lang } = await params;
    const currentLang = lang || "en";

    // 2. Parallel Processing (Alert + UI Translation)
    // We run both the "Live Data Translation" and "Static UI Translation" in parallel for speed.
    const [safeAlert, uiText] = await Promise.all([
        processLiveAlert(INCOMING_FEED, currentLang),
        translateDashboardUI(currentLang)
    ]);

    return (
        <main className="max-w-md mx-auto min-h-screen bg-gray-100 flex flex-col">
            <DashboardHeader title={uiText.headerTitle} />

            <DashboardMap label={uiText.mapLabel} />

            <LiveAlertCard
                alert={safeAlert}
                liveAlertLabel={uiText.liveAlertLabel}
                dataLockLabel={uiText.dataLockLabel}
            />

            <ActionButtons
                safeLabel={uiText.btnSafe}
                emergencyLabel={uiText.btnEmergency}
            />

            {/* Language Switcher for Testing */}
            <div className="p-4 bg-gray-200 flex flex-wrap gap-2 justify-center text-xs">
                <a href="/en/dashboard" className="p-1 border bg-white">EN</a>
                <a href="/es/dashboard" className="p-1 border bg-white">ES</a>
                <a href="/de/dashboard" className="p-1 border bg-white">DE</a>
                <a href="/ja/dashboard" className="p-1 border bg-white">JA</a>
                <a href="/fr/dashboard" className="p-1 border bg-white">FR</a>
                <a href="/zh/dashboard" className="p-1 border bg-white">ZH</a>
                <a href="/hi/dashboard" className="p-1 border bg-white">HI</a>
                <a href="/pt/dashboard" className="p-1 border bg-white">PT</a>
                <a href="/it/dashboard" className="p-1 border bg-white">IT</a>
                <a href="/ko/dashboard" className="p-1 border bg-white">KO</a>
                <a href="/ru/dashboard" className="p-1 border bg-white">RU</a>
            </div>
        </main>
    );
}
