declare global {
  interface KVNamespace {
    get: <T = string>(key: string) => Promise<T | null>
    put: (key: string, value: string, options?: KVPutOptions) => Promise<void>
    delete: (key: string) => Promise<void>
  }

  declare const kv: KVNamespace
}

export {}
