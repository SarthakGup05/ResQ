import type { NextConfig } from "next";
import { withLingo } from "@lingo.dev/compiler/next";
import path from "path";

const nextConfig: NextConfig = {};

export default async function (): Promise<NextConfig> {
  return await withLingo(nextConfig, {
    sourceRoot: path.resolve(process.cwd()),
    sourceLocale: "en",
    targetLocales: ["es", "de", "ja"],
    models: "lingo.dev",
    dev: {
      usePseudotranslator: true, // Fake translations for development
    },
  });
}
