// lib/resq-engine.ts
import { LingoDotDevEngine } from "lingo.dev/sdk";

// Initialize the Runtime SDK
const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY!,
});

export interface AlertData {
  id: string;
  message: string;
  severity: "critical" | "warning" | "info";
  location: {
    lat: number;
    lng: number;
    name: string; // e.g., "Sector 7"
  };
}

// UI Strings Interface
export interface DashboardUI {
  headerTitle: string;
  mapLabel: string;
  btnSafe: string;
  btnEmergency: string;
  liveAlertLabel: string;
  dataLockLabel: string;
}

// Default English Strings (Source of Truth)
const DEFAULT_UI: DashboardUI = {
  headerTitle: "Danger Zone",
  mapLabel: "Live Location Feed",
  btnSafe: "I am Safe",
  btnEmergency: "Call Emergency",
  liveAlertLabel: "Live Alert",
  dataLockLabel: "SECURE_DATA_LOCK",
};

export async function processLiveAlert(alert: AlertData, targetLocale: string) {
  console.log(
    `[ResQ Engine] Processing alert ${alert.id} for locale: ${targetLocale}`,
  );

  // 1. Context Injection
  const contextEnhancedMessage = `${alert.message} near ${alert.location.name}.`;

  // 2. Variable Protection & Translation
  const translatedText = await lingo.localizeText(contextEnhancedMessage, {
    sourceLocale: "en",
    targetLocale: targetLocale,
  });

  return {
    ...alert,
    message: translatedText,
    location: alert.location,
  };
}

export async function translateDashboardUI(
  targetLocale: string,
): Promise<DashboardUI> {
  if (targetLocale === "en") return DEFAULT_UI;

  console.log(`[ResQ Engine] Translating UI for locale: ${targetLocale}`);

  // We batch translate the UI strings
  // In a real app, you might cache this result heavily
  const textsToTranslate = [
    DEFAULT_UI.headerTitle,
    DEFAULT_UI.mapLabel,
    DEFAULT_UI.btnSafe,
    DEFAULT_UI.btnEmergency,
    DEFAULT_UI.liveAlertLabel,
    // We strictly don't translate dataLockLabel if we want to keep it technical,
    // but let's translate it for user friendliness if needed.
    // For now, let's keep it as a technical term, or translate it. Let's translate it.
    DEFAULT_UI.liveAlertLabel, // Duplicate just to match index, wait.
  ];

  // Better approach: Translate values
  const keys = Object.keys(DEFAULT_UI) as Array<keyof DashboardUI>;
  const values = keys.map((k) => DEFAULT_UI[k]);

  // Parallel translation (or use a bulk API if available, localizeText is single)
  // Lingo SDK currently is 1-by-1 for simple calls, usually fast.
  const translatedValues = await Promise.all(
    values.map((text) =>
      lingo.localizeText(text, {
        sourceLocale: "en",
        targetLocale: targetLocale,
      }),
    ),
  );

  // Reassemble
  const translatedUI = {} as DashboardUI;
  keys.forEach((key, index) => {
    translatedUI[key] = translatedValues[index];
  });

  return translatedUI;
}
