"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import disasterData from "./data.json";

export default function AdminPage() {
    const [status, setStatus] = useState("Idle");

    const triggerDisaster = async () => {
        setStatus("Broadcasting...");

        try {
            const scenario = disasterData[0]; // Using the first scenario for now

            // Using axios instead of fetch
            const res = await axios.post("/api/trigger", {
                text: scenario.text,
                lat: scenario.lat,
                long: scenario.long,
                targetLang: scenario.targetLang
            });

            console.log("Disaster Broadcasted:", res.data);
            setStatus("Sent! Check Console.");
        } catch (error) {
            console.error("Broadcast failed:", error);
            setStatus("Failed! Check Console.");
        }
    };

    return (
        <div className="p-10 flex flex-col gap-5 items-center justify-center min-h-screen bg-neutral-950 text-white">
            <Card className="w-[400px] border-red-600 border-2 bg-black">
                <CardHeader>
                    <CardTitle className="text-red-500 font-bold text-2xl">🚨 EMERGENCY CONTROL</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-400">Simulate Government Feed</p>
                    <Button
                        onClick={triggerDisaster}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg"
                    >
                        TRIGGER EARTHQUAKE
                    </Button>
                    <div className="text-center font-mono text-sm text-yellow-500">
                        Status: {status}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
