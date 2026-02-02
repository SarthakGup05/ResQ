import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="max-w-md mx-auto min-h-screen bg-gray-100 flex flex-col">
            {/* Header Skeleton */}
            <div className="h-14 border-b bg-white flex items-center justify-center">
                <Skeleton className="h-6 w-32" />
            </div>

            {/* Map Skeleton */}
            <div className="w-full aspect-video bg-gray-200 relative flex items-center justify-center">
                <Skeleton className="h-full w-full" />
            </div>

            {/* Card Skeleton */}
            <div className="p-4 -mt-6 mx-4 relative z-10 w-[calc(100%-2rem)]">
                <div className="bg-white rounded-lg shadow-lg p-4 h-40 space-y-4">
                    <div className="flex justify-between">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>

            {/* Buttons Skeleton */}
            <div className="mt-auto p-4 flex gap-3 bg-white border-t">
                <Skeleton className="flex-1 h-12 rounded-md" />
                <Skeleton className="flex-1 h-12 rounded-md" />
            </div>
        </div>
    );
}
