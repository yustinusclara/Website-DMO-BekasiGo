/**
 * Mock auth handler — to be swapped for Supabase (or NextAuth) later.
 * Simulates a network call, logs credentials, and resolves with a fake
 * session shape that mirrors what the real client will return.
 */
export async function mockSignInWithPassword({ email, password, remember }) {
  await sleep(900)
  // eslint-disable-next-line no-console
  console.log('[mockAuth] password sign-in:', { email, password: '•'.repeat(password?.length ?? 0), remember })
  // Simulate a bad-password case for demo purposes
  if (password === 'wrong') {
    throw new AuthError('invalid-credentials', 'The email or password is incorrect.')
  }
  return { user: { email, role: 'editor' }, session: { token: 'mock-token' } }
}

export async function mockSignInWithGoogle() {
  await sleep(750)
  // eslint-disable-next-line no-console
  console.log('[mockAuth] Google sign-in requested')
  return { user: { email: 'you@bekasigo.id', role: 'editor', provider: 'google' } }
}

export async function mockSendMagicLink({ email }) {
  await sleep(650)
  // eslint-disable-next-line no-console
  console.log('[mockAuth] magic-link requested for:', email)
  if (!isValidEmail(email)) {
    throw new AuthError('invalid-email', 'Please enter a valid email address.')
  }
  return { ok: true }
}

export class AuthError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

export function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v ?? '').trim())
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)) }
