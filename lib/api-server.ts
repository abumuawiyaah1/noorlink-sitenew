/** Server-only FastAPI base URL (internal network / Railway private URL). */
export const SERVER_API_BASE =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ??
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";
