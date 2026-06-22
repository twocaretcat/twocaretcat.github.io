import { defineConfig, devices } from '@playwright/test';

// Gatsby's offline plugin only permits service workers on localhost.
const BASE_URL = 'http://localhost:8000' as const;
const SERVER_URL = 'http://127.0.0.1:8000' as const;
const TEST_REPORTS_DIR = './test/reports' as const;
const PLAYWRIGHT_HTML_REPORT_DIR = `${TEST_REPORTS_DIR}/playwright/html` as const;
const PLAYWRIGHT_OUTPUT_DIR = `${TEST_REPORTS_DIR}/playwright/results` as const;
const SERVER_COMMANDS = {
	development: 'bun run develop',
	production: 'bun run serve',
} as const;

type ServerMode = keyof typeof SERVER_COMMANDS;

const serverMode = process.env.PLAYWRIGHT_SERVER_MODE ?? 'production';

function isServerMode(value: string): value is ServerMode {
	return value in SERVER_COMMANDS;
}

if (!isServerMode(serverMode)) {
	throw new Error(
		`Invalid PLAYWRIGHT_SERVER_MODE "${serverMode}". Expected "development" or "production".`,
	);
}

export default defineConfig({
	testDir: './test/browser',
	testMatch: '**/*.e2e.ts',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	...(process.env.CI ? { workers: 1 } : {}),
	outputDir: PLAYWRIGHT_OUTPUT_DIR,
	reporter: [
		['list'],
		['html', { open: 'never', outputFolder: PLAYWRIGHT_HTML_REPORT_DIR }],
	],
	use: {
		baseURL: BASE_URL,
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	webServer: {
		command: SERVER_COMMANDS[serverMode],
		url: SERVER_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		stdout: 'pipe',
		stderr: 'pipe',
	},
});
