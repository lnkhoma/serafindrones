/**
 * POST /api/contact
 *
 * Validates a demo / office-visit request with the shared zod schema and
 * appends it as one row to Google Sheets (column order: see SHEET_HEADERS
 * in /lib/schema.ts).
 *
 * Responses:
 *   200 { ok: true }
 *   400 { ok: false, error }                       malformed JSON
 *   422 { ok: false, error, fieldErrors }          validation failed
 *   500 / 503 { ok: false, error }                 Sheets unavailable / not configured
 */
import { NextResponse } from "next/server";
import { contactSchema, toSheetRow } from "@/lib/schema";
import { appendRow, SheetsConfigError } from "@/lib/sheets";

// googleapis needs the Node.js runtime (not Edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field. Pretend
  // success so bots don't learn they were filtered.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some fields need attention. Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  try {
    await appendRow(toSheetRow(parsed.data));
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SheetsConfigError) {
      // Logged server-side only. Never expose config details to the browser.
      console.error("[contact]", error.message);
      return NextResponse.json(
        { ok: false, error: "Our booking system isn't available right now." },
        { status: 503 },
      );
    }
    console.error("[contact] Failed to append to Google Sheets:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your request right now." },
      { status: 500 },
    );
  }
}
