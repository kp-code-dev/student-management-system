const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").trim();

export async function apiRequest(endpoint, options = {}) {
  // Login ke baad saved JWT token retrieve karo
  // Lekin login aur register requests par Authorization header mat bhejo
  const isAuthEndpoint = endpoint.startsWith("/auth/login") || endpoint.startsWith("/auth/register");
  const token = !isAuthEndpoint ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    let message = errorData?.message || errorData?.error;
    if (!message) {
      if (response.status === 403 || response.status === 401) {
        message = "Invalid email or password.";
      } else {
        message = `API Error: ${response.status}`;
      }
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}