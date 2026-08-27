import 'server-only';

import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/** Sheet tab and columns the enquiry row is appended to. */
const DEFAULT_RANGE = 'Enquiries!A:F';

/**
 * Private keys arrive from the environment with their newlines escaped — a
 * `.env` file cannot hold a literal line break inside a quoted value, and most
 * hosting dashboards paste the key back the same way. PEM parsing fails with a
 * misleading `error:1E08010C` unless they are restored first.
 */
function readPrivateKey() {
  const key = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if (!key) return null;
  return key.replace(/\\n/g, '\n');
}

let cachedClient = null;

/**
 * Authorised Sheets client, memoised for the life of the server instance so a
 * warm lambda reuses one JWT rather than re-signing on every enquiry.
 */
function getSheetsClient() {
  if (cachedClient) return cachedClient;

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = readPrivateKey();

  if (!clientEmail || !privateKey) {
    throw new Error(
      'Missing Google credentials: set GOOGLE_SHEETS_CLIENT_EMAIL and GOOGLE_SHEETS_PRIVATE_KEY.'
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  cachedClient = google.sheets({ version: 'v4', auth });
  return cachedClient;
}

/**
 * Appends one enquiry to the sheet. Column order is fixed here and must match
 * the header row — see README "Contact form".
 *
 * Throws on any Google-side failure so the route can decide what the visitor
 * sees; it deliberately does not swallow errors, or a broken key would look
 * like a successful submission.
 */
export async function appendEnquiry({ name, email, storeUrl, message, source }) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('Missing Google credentials: set GOOGLE_SHEETS_SPREADSHEET_ID.');
  }

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: process.env.GOOGLE_SHEETS_RANGE || DEFAULT_RANGE,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[new Date().toISOString(), name, email, storeUrl, message, source]],
    },
  });
}
