export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
// process.env.NEXT_PUBLIC_STRAPI_URL ||
export function getAuthHeaders(): HeadersInit {
  if (typeof window !== "undefined") {
    const jwt = localStorage.getItem("jwt")
    return jwt ? { Authorization: `Bearer ${jwt}` } : {}
  }
  return {}
}

