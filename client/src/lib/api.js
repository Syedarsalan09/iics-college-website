import { getAdminToken } from "./adminAuth";

const apiBaseUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest(
  path,
  options = {},
  { expectedStatus, authenticated = false } = {}
) {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (authenticated) {
    const token = getAdminToken();
    if (!token) {
      throw new ApiError("Admin sign-in is required.", 401);
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    if (response.ok) {
      throw new Error("The server returned an invalid response.");
    }
  }

  if (!response.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  if (expectedStatus && response.status !== expectedStatus) {
    throw new ApiError(
      `Expected HTTP ${expectedStatus}, but received HTTP ${response.status}.`,
      response.status
    );
  }

  return payload;
}
