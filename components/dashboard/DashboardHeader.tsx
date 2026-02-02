// components/dashboard/DashboardHeader.tsx
import { AlertTriangle } from "lucide-react";

interface DashboardHeaderProps {
    title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-center px-4">
                <div className="flex items-center gap-2 font-bold text-red-600 uppercase tracking-widest text-lg">
                    <AlertTriangle className="h-5 w-5" />
                    <span>{title}</span>
                </div>
            </div>
        </header>
    );
}
