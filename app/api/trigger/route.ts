import { NextResponse } from "next/server";
import { LingoDotDevEngine } from "lingo.dev/sdk";

// Initialize the SDK
const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, lat, long, targetLang } = body;

    // 1. Construct the payload
    // We put the text in a field the SDK will translate,
    // but keep numbers (lat/long) separate or as numbers so they aren't touched.
    const payload = {
      alert_message: text,
      category: "Emergency",
      // Adding context to the object helps the AI understand
      _context: "This is a government disaster alert. Keep tone urgent.",
    };

    // 2. Translate using localizeObject
    // This preserves the structure and only translates the string values
    const translated = await lingo.localizeObject(payload, {
      sourceLocale: "auto",
      targetLocale: targetLang || "es",
    });

    // 3. Return the clean, safe data to your frontend
    return NextResponse.json({
      original: text,
      translated_text: translated.alert_message,
      // We pass the coordinates back exactly as they came in (Variable Protection)
      location: { lat, long },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
