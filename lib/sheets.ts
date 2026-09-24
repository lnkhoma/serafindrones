/**
 * Server-only Google Sheets helper.
 * Never import this file from a client component: it reads secrets.
 *
 * Required environment variables (see .env.local.example / README):
 *   GOOGLE_SHEETS_CLIENT_EMAIL    service account email
 *   GOOGLE_SHEETS_PRIVATE_KEY     service account private key (\n-escaped is fine)
 *   GOOGLE_SHEETS_SPREADSHEET_ID  ID from the spreadsheet URL
 */
import { google, type sheets_v4 } from "googleapis";

export class SheetsConfigError extends Error {
  constructor(missing: string[]) {
    super(`Google Sheets is not configured. Missing env: ${missing.join(", ")}`);
    this.name = "SheetsConfigError";
  }
}

let cachedClient: sheets_v4.Sheets | null = null;

function readConfig() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  const missing: string[] = [];
  if (!clientEmail) missing.push("GOOGLE_SHEETS_CLIENT_EMAIL");
  if (!rawKey) missing.push("GOOGLE_SHEETS_PRIVATE_KEY");
  if (!spreadsheetId) missing.push("GOOGLE_SHEETS_SPREADSHEET_ID");
  if (!clientEmail || !rawKey || !spreadsheetId) throw new SheetsConfigError(missing);

  // Env vars usually store the key on one line with literal "\n" sequences.
  // Convert them back to real newlines, and strip wrapping quotes if present.
  const privateKey = rawKey.replace(/^"|"$/g, "").replace(/\\n/g, "\n");

  return { clientEmail, privateKey, spreadsheetId };
}

function getClient(clientEmail: string, privateKey: string) {
  if (!cachedClient) {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    cachedClient = google.sheets({ version: "v4", auth });
  }
  return cachedClient;
}

/**
 * Appends one row to the spreadsheet.
 * @param range A1 range of the table to append to. "A1" targets the first tab;
 *              "Newsletter!A1" targets the tab named "Newsletter".
 */
export async function appendRow(values: (string | number)[], range = "A1") {
  const { clientEmail, privateKey, spreadsheetId } = readConfig();
  const sheets = getClient(clientEmail, privateKey);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    // RAW stores values exactly as typed. This prevents formula injection
    // (e.g. a note starting with "=") and keeps "+265…" phone numbers intact.
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}
