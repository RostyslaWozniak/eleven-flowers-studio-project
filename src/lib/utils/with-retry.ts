export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000,
): Promise<T> {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      console.error(`DB attempt ${attempt} failed`, err);

      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs * attempt)); // backoff
      }
    }
  }

  throw lastError;
}
