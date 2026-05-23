import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK") {
      return "Unable to reach the server. Please check your internet connection or try again later.";
    }
    if (error.code === "ECONNABORTED") {
      return "Request timed out. The server may be starting up — please try again.";
    }
    const msg = error.response?.data?.message;
    if (Array.isArray(msg)) return msg[0] ?? fallback;
    if (typeof msg === "string") return msg;
    if (error.response?.status) {
      return `Server error (${error.response.status}). Please try again later.`;
    }
  }
  return fallback;
}
