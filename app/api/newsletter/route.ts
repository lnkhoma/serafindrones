/**
 * POST /api/newsletter
 *
 * Appends [Timestamp, Email] to a tab named "Newsletter" in the same
 * spreadsheet as the contact form. Create that tab before going live
 * (see README → "Connecting the Contact Form to Google Sheets").
 */
import { NextResponse } from "next/server";
import { formatTimestamp, newsletterSchema } from "@/lib/schema";
import { appendRow, SheetsConfigError } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NEWSLETTER_RANGE = "Newsletter!A1";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 422 });
  }

  try {
    await appendRow([formatTimestamp(new Date()), parsed.data.email], NEWSLETTER_RANGE);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[newsletter]", error instanceof SheetsConfigError ? error.message : error);
    return NextResponse.json({ ok: false, error: "Couldn't subscribe right now." }, { status: 500 });
  }
}
