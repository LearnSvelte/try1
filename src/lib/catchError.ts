/**
 * Catches errors from a promise and returns a tuple with either the error or the resolved data.
 * @template T
 * @param {Promise<T>} promise - The promise to handle.
 * @returns {Promise<[undefined, T] | [Error]>} A promise that resolves to a tuple:
 * - `[undefined, data]` if the promise resolves successfully.
 * - `[error]` if the promise is rejected.
 * @example
 * const [error, data] = await catchError(fetch('https://example.com'));
 */
export async function catchError<T> (promise: Promise<T>): Promise<[undefined, T] | [Error]> {
  try {
    const data = await promise
    return [undefined, data]
  }
  catch (error) {
    return [error instanceof Error ? error : new Error(String(error))]
  }
}

export type CatchErrorReturn<T> = ReturnType<typeof catchError<T>>
