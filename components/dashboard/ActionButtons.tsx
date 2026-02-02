// components/dashboard/ActionButtons.tsx
import { Button } from "@/components/ui/button";
import { CheckCircle2, PhoneCall } from "lucide-react";

interface ActionButtonsProps {
    safeLabel: string;
    emergencyLabel: string;
}

export default function ActionButtons({ safeLabel, emergencyLabel }: ActionButtonsProps) {
    return (
        <div className="mt-auto p-4 flex gap-3 bg-background border-t">
            <Button variant="outline" className="flex-1 h-12 text-base font-semibold border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                {safeLabel}
            </Button>
            <Button variant="destructive" className="flex-1 h-12 text-base font-semibold shadow-red-200 shadow-md">
                <PhoneCall className="mr-2 h-5 w-5" />
                {emergencyLabel}
            </Button>
        </div>
    );
}
