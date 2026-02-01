import ClientLingoProvider from "@/components/ClientLingoProvider";
import { LocaleCode } from "lingo.dev/spec";

export default async function LocalizedLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    return (
        <ClientLingoProvider initialLocale={lang as LocaleCode}>
            {children}
        </ClientLingoProvider>
    );
}
