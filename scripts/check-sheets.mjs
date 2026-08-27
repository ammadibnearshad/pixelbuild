/**
 * Connection check for the contact form's Google Sheet.
 *
 *   npm run check:sheets
 *
 * Runs the same three things the live route does — authenticate, find the
 * sheet, append a row — and maps each Google error to the one setup step that
 * actually causes it, because the raw messages rarely name it.
 */

import { google } from 'googleapis';

const ok = (msg) => console.log(`  OK    ${msg}`);
const info = (msg) => console.log(`        ${msg}`);


function fail(title, ...fixes) {
  console.log(`FAIL    ${title}`);
  fixes.forEach((line) => console.log(`     -> ${line}`));
  process.exit(1);
}

const {
  GOOGLE_SHEETS_CLIENT_EMAIL: clientEmail,
  GOOGLE_SHEETS_PRIVATE_KEY: rawKey,
  GOOGLE_SHEETS_SPREADSHEET_ID: spreadsheetId,
  GOOGLE_SHEETS_RANGE: range = 'Enquiries!A:F',
} = process.env;

console.log('\nChecking the contact form → Google Sheets connection\n');

// ---- 1. environment --------------------------------------------------------

const missing = [
  !clientEmail && 'GOOGLE_SHEETS_CLIENT_EMAIL',
  !rawKey && 'GOOGLE_SHEETS_PRIVATE_KEY',
  !spreadsheetId && 'GOOGLE_SHEETS_SPREADSHEET_ID',
].filter(Boolean);

if (missing.length) {
  fail(
    `Missing from .env.local: ${missing.join(', ')}`,
    'Copy .env.example to .env.local and fill it in.',
    'If .env.local exists, check the file is in the project root.'
  );
}
ok('Environment variables present');
info(`service account: ${clientEmail}`);
info(`spreadsheet id:  ${spreadsheetId}`);
info(`range:           ${range}`);

const privateKey = rawKey.replace(/\\n/g, '\n');
if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
  fail(
    'GOOGLE_SHEETS_PRIVATE_KEY does not look like a PEM key',
    'Copy the whole `private_key` value from the service account JSON,',
    'including the -----BEGIN PRIVATE KEY----- and -----END----- lines.'
  );
}
ok('Private key looks like a PEM block');

// ---- 2. authenticate -------------------------------------------------------

const auth = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

try {
  await auth.authorize();
  ok('Authenticated with Google');
} catch (error) {
  const message = String(error?.message || error);
  if (/DECODER|PEM|asn1|1E08010C/i.test(message)) {
    fail(
      'The private key could not be parsed',
      'The \\n sequences must survive into .env.local. Wrap the value in',
      'double quotes and leave the \\n as literal backslash-n, not real breaks.',
      `Google said: ${message}`
    );
  }
  if (/invalid_grant/i.test(message)) {
    fail(
      'Google rejected the credentials',
      'The key may have been deleted, or this machine\'s clock is off by minutes.',
      `Google said: ${message}`
    );
  }
  fail('Authentication failed', message);
}

const sheets = google.sheets({ version: 'v4', auth });

// ---- 3. reach the spreadsheet ----------------------------------------------

let tabs = [];
try {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  tabs = meta.data.sheets.map((s) => s.properties.title);
  ok(`Opened "${meta.data.properties.title}"`);
  info(`tabs: ${tabs.join(', ')}`);
} catch (error) {
  const status = error?.code || error?.response?.status;
  const message = String(error?.errors?.[0]?.message || error?.message || error);

  if (status === 403 && /API has not been used|disabled/i.test(message)) {
    fail(
      'The Google Sheets API is not enabled on this project',
      'Google Cloud console → APIs & Services → Library → Google Sheets API → Enable.',
      'It can take a minute to take effect after enabling.'
    );
  }
  if (status === 403) {
    fail(
      'The service account cannot open this sheet',
      'Open the sheet → Share → paste the service account email → Editor → Send.',
      `Share it with: ${clientEmail}`
    );
  }
  if (status === 404) {
    fail(
      'No sheet with that id',
      'GOOGLE_SHEETS_SPREADSHEET_ID is the part of the URL between /d/ and /edit.',
      'Copy the id only — not the whole URL.'
    );
  }
  fail('Could not open the spreadsheet', message);
}

// ---- 4. append a test row --------------------------------------------------

const tabName = range.split('!')[0].replace(/^'|'$/g, '');
if (!tabs.includes(tabName)) {
  fail(
    `The sheet has no tab named "${tabName}"`,
    `Rename a tab to "${tabName}", or set GOOGLE_SHEETS_RANGE to match one of:`,
    tabs.join(', ')
  );
}
ok(`Tab "${tabName}" exists`);

try {
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          'Connection test',
          'test@thepixelbuild.com',
          'https://example.com',
          'Written by npm run check:sheets — safe to delete this row.',
          'Setup check',
        ],
      ],
    },
  });
  ok(`Test row written to ${res.data.updates.updatedRange}`);
} catch (error) {
  const status = error?.code || error?.response?.status;
  const message = String(error?.errors?.[0]?.message || error?.message || error);
  if (status === 403) {
    fail(
      'The service account can read the sheet but not write to it',
      'Re-share the sheet as Editor, not Viewer or Commenter.',
      `Share it with: ${clientEmail}`
    );
  }
  fail('Could not append a row', message);
}

console.log('\nEverything is connected. Delete the test row and submit the real form.\n');
