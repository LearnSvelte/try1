export async function getValueByKey (key: string): Promise<{ data: string, exists: boolean }> {
  console.log('getValueByKey key:', key)

  try {
    const encodedKey = encodeURIComponent(key)
    const checkResponse = await fetch(`/api/kv?key=${encodedKey}`)

    // if (checkResponse.status === 404) {
    //   return false
    // }

    if (!checkResponse.ok) {
      const errorText = await checkResponse.text()
      throw new Error(`❌ Ошибка при проверке ключа! Status: ${checkResponse.status}, Response: ${errorText}`)
    }

    const data = await checkResponse.json()
    console.log('getValueByKey data:', data)
    return data
  }
  catch (error) {
    console.error('Error checking KV:', error)
    throw error instanceof Error ? error : new Error('❌ Неизвестная ошибка!')
  }
}
