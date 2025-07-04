export async function fetchFromStrapi(endpoint: string, query = {}) {
    const queryString = new URLSearchParams(query as Record<string, string>).toString()
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ""}`
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      credentials: "include", // Add this line
    })
  
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`)
    }
  
    return await response.json()
  }
  
  