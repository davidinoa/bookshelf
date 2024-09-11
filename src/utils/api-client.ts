type Config = {}

export async function client(endpoint: string, customConfig: Config = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }
  const fullUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${endpoint}`
  const response = await window.fetch(fullUrl, config)
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
}
