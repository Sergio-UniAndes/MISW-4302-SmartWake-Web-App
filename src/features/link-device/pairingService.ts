// Mock pairing service — replace `pairDevice` with the real API call once the backend exists.

export type PairingResult = { status: 'paired'; code: string } | { status: 'not-found' }

const CODE_PATTERN = /^SW([A-Z0-9]{4})$/

/**
 * Normalizes user input like "sw 4829", "SW - 4829" or "sw4829" to "SW-4829".
 * Returns null when the input is not a valid SW-XXXX code.
 */
export function normalizePairingCode(input: string): string | null {
  const compact = input.replace(/[\s-]/g, '').toUpperCase()
  const match = CODE_PATTERN.exec(compact)
  return match ? `SW-${match[1]}` : null
}

// Codes the mock backend knows about. SW-4829 is the example shown in the setup steps.
const KNOWN_CODES = new Set(['SW-4829'])
const MOCK_LATENCY_MS = 800

export async function pairDevice(code: string): Promise<PairingResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
  return KNOWN_CODES.has(code) ? { status: 'paired', code } : { status: 'not-found' }
}
