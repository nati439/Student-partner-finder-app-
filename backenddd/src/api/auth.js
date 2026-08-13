// // api/auth.js
// # The main idea to remember
// # Your frontend doesn't directly perform the login/signup logic.
// # Instead:
// # Frontend asks → API function sends request → Backend does the work → Backend responds → API function gives result back to frontend.

// # It's mainly about:
// # Maintainability → easier to change things
// # Organization → configuration is separated from code
// # Deployment → local backend and production backend can have different URLs
// # Scalability → becomes more useful as your project grows

const BASE_URL = import.meta.env.VITE_API_URL;
// # Gets your backend's URL from .env and stores it in BASE_URL.
// # Purpose: Avoid hardcoding the backend URL everywhere.

export async function login(username, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Invalid username or password");
    return res.json();
}


export async function signup(username, password) {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
}