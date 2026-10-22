const ADMIN_TOKEN_KEY = "iics-admin-token";

export function getAdminToken() {
  try {
    return window.localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token) {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  try {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {
    // Sign-out still navigates away; a blocked storage API cannot retain app state.
  }
}
