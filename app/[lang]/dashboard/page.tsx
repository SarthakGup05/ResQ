"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, RefreshCcw } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Dashboard() {
    // 1. Start with "Safe" State
    const [alert, setAlert] = useState<any>({ active: false });

    // 2. The Listener Logic
    useEffect(() => {
        const checkAlert = () => {
            const data = localStorage.getItem("latest_alert");
            if (data) {
                setAlert(JSON.parse(data));
            }
        };

        // Check immediately on load
        checkAlert();

        // Listen for updates from the Admin tab
        window.addEventListener("storage", checkAlert);

        // Optional: Poll every 1 second just to be sure
        const interval = setInterval(checkAlert, 1000);

        return () => {
            window.removeEventListener("storage", checkAlert);
            clearInterval(interval);
        };
    }, []);

    // 3. Helper to reset the demo
    const clearAlert = () => {
        localStorage.removeItem("latest_alert");
        setAlert({ active: false });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex flex-col gap-6 max-w-md mx-auto">
            <div className="flex justify-between items-center">
                {/* Compiler will translate this automatically */}
                <h1 className="text-2xl font-bold text-slate-900">ResQ Dashboard</h1>
                <LanguageSwitcher />
            </div>

            <Card className={alert.active ? "border-red-500 bg-red-50 animate-pulse" : "border-green-500 bg-green-50"}>
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    {alert.active ? (
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    ) : (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                    <CardTitle className={alert.active ? "text-red-700" : "text-green-700"}>
                        {alert.active ? "EMERGENCY ALERT" : "You are Safe"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium text-slate-800">
                        {alert.active ? alert.message : "Monitoring local government feeds..."}
                    </p>
                    {alert.active && (
                        <p className="text-sm text-slate-500 mt-2">
                            Received: {alert.timestamp}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Show Map only if Alert is Active */}
            {alert.active && alert.location && (
                <div className="space-y-2">
                    <h3 className="font-semibold text-slate-700">Affected Area</h3>
                    <Map lat={alert.location.lat} long={alert.location.long} />
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-auto">
                <Button variant="destructive" className="h-12 text-lg">
                    SOS Call
                </Button>
                <Button variant="outline" className="h-12 text-lg border-slate-400" onClick={clearAlert}>
                    I am Safe
                </Button>
            </div>
        </div>
    );
}
