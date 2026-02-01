"use client";

import { LingoProvider } from "@lingo.dev/compiler/react";
import { LocaleCode } from "lingo.dev/spec";
import { useRouter } from "next/navigation";

export default function ClientLingoProvider({
    children,
    initialLocale,
}: {
    children: React.ReactNode;
    initialLocale: LocaleCode;
}) {
    const router = useRouter();

    return (
        <LingoProvider initialLocale={initialLocale} router={router}>
            {children}
        </LingoProvider>
    );
}
