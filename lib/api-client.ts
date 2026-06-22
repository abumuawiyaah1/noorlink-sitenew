/** Client-side FastAPI base URL (CORS-enabled in app/api/main.py). */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000";
