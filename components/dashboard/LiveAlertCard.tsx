// components/dashboard/LiveAlertCard.tsx
import { AlertData } from "@/lib/resq-engine";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";

interface LiveAlertCardProps {
    alert: AlertData;
    liveAlertLabel: string;
    dataLockLabel: string;
}

export default function LiveAlertCard({ alert, liveAlertLabel, dataLockLabel }: LiveAlertCardProps) {
    return (
        <Card className="w-full shadow-lg border-l-4 border-l-destructive overflow-hidden relative z-10 -mt-6 mx-auto max-w-[calc(100%-2rem)]">
            <CardHeader className="pb-2 space-y-0">
                <div className="flex justify-between items-start">
                    <Badge variant="destructive" className="uppercase tracking-wider font-bold animate-pulse">
                        {liveAlertLabel}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">{alert.id}</span>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex gap-3">
                    <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <h2 className="text-lg font-bold leading-tight">
                        {alert.message}
                    </h2>
                </div>

                <div className="mt-4 p-2.5 bg-muted/50 rounded-md border text-xs font-mono text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>{dataLockLabel}: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}</span>
                </div>
            </CardContent>
        </Card>
    );
}
