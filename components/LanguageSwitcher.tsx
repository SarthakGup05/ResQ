"use client";

import React from "react";
import { useLingoContext } from "@lingo.dev/compiler/react";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLingoContext();
    const pathname = usePathname();
    const router = useRouter();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        setLocale(newLocale as any);

        if (pathname) {
            const segments = pathname.split("/");
            // segments[0] is empty because path starts with /
            // segments[1] is the locale (e.g., "en", "es")
            segments[1] = newLocale;
            const newPath = segments.join("/");
            router.push(newPath);
        }
    };

    return (
        <div className="relative">
            <select
                value={locale}
                onChange={handleLanguageChange}
                className="w-[140px] h-10 px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent appearance-none cursor-pointer"
            >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="ja">🇯🇵 日本語</option>
            </select>
            {/* Custom arrow for better aesthetics matching shadcn */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </div>
        </div>
    );
}