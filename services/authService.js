// Fetch for register

const REGISTER_API_URL = "http://localhost:8000/api/auth/register/";

function safeJSON(response, fallback = {}) {
  return response.json().catch(() => fallback);
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : value;
}

function normalizeRegisterData(userData) { // Ensure all expected fields are present and properly formatted
  return {
    ...userData,
    username: cleanString(userData.username),
    email: cleanString(userData.email),
    password: typeof userData.password === "string" ? userData.password : "",
    confirmPassword:
      typeof userData.confirmPassword === "string" ? userData.confirmPassword : undefined,
    confirm_password:
      typeof userData.confirm_password === "string" ? userData.confirm_password : undefined,
    name: cleanString(userData.name),
    gender: cleanString(userData.gender),
    phone_number: cleanString(userData.phone_number),
    birthday: cleanString(userData.birthday),
    home_address: cleanString(userData.home_address),
    preferred_language: cleanString(userData.preferred_language),
  };
}

export async function registerUser(userData) { // userData should be an object with all the registration fields, we will normalize it to ensure it has the correct format and all expected fields before sending it to the backend.
  const normalizedData = normalizeRegisterData(userData);
  const {
    confirmPassword,
    confirm_password,
    ...registerData
  } = normalizedData;

// payload : is the data that we send to the backend, we need to adjust it according to the backend requirements, we also need to make sure that we are sending the correct data and in the correct format.
  const payload = { // Adjust the payload structure as needed for your backend
    username: registerData.username,
    email: registerData.email,
    password: registerData.password,
    confirm_password: confirm_password || confirmPassword || "",

    name: registerData.name,
    gender: registerData.gender,
    phone_number: registerData.phone_number,
    birthday: registerData.birthday,
    home_address: registerData.home_address,
    preferred_language: registerData.preferred_language || "en",
  };

  const response = await fetch(REGISTER_API_URL, { // Adjust the URL as needed for your backend
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await safeJSON(response);

  if (!response.ok) {
  console.log("Payload sent:", payload);
  console.log("Backend error:", data);
  throw data;
}

  return data;
}

// this is for make communication with the backend for authentication.


// Login fetch

const LOGIN_API_URL = "http://localhost:8000/api/auth/login/";

export async function loginUser(userData) { // userData should be an object with login identifier + password
  const rawIdentifier = userData.username || userData.email || "";
  const identifier = cleanString(rawIdentifier) || "";
  const password = typeof userData.password === "string" ? userData.password : "";
  const payload = identifier.includes("@")
    ? { email: identifier, password }
    : { username: identifier, password };

  const response = await fetch(LOGIN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await safeJSON(response);

  if (!response.ok) {
    throw data;
  }

  return data;
}

function safeParseJSON(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function decodeJWTPayload(token) { // JWTs are typically in the format header.payload.signature, we want to decode the payload which is the second part, we also need to handle the case where the token is not in the correct format or is not a valid JWT.
  if (!token || token.split('.').length < 2) {
    return null;
  }

  try {
    const payload = token.split('.')[1]; // Get the payload part of the JWT
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function getStoredUser() { // This function retrieves the stored user information from localStorage, it returns null if there is no user information or if the stored data is not valid JSON.
  return safeParseJSON(localStorage.getItem('user'));
}

export function getCurrentUserName() { // This function retrieves the current user's name from various sources, it checks the stored user information first, then it checks for a separate userName entry in localStorage, and finally it tries to decode the JWT token to extract the name. It returns an empty string if no name is found.
  
  const storedUser = getStoredUser();
  if (storedUser?.name) {
    return storedUser.name;
  }
  if (storedUser?.username) {
    return storedUser.username;
  }

  const nameFromStorage = localStorage.getItem('userName');
  if (nameFromStorage) {
    return nameFromStorage;
  }

  const payload = decodeJWTPayload(localStorage.getItem('token'));
  return payload?.name || payload?.username || payload?.user_name || payload?.sub || '';
}

export function saveAuthSession(token, user) {
  localStorage.setItem('token', token);

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    const preferredName = user.name || user.username || user.email;
    if (preferredName) {
      localStorage.setItem('userName', preferredName);
    }
    return;
  }

  const nameFromToken = getCurrentUserName();
  if (nameFromToken) {
    localStorage.setItem('userName', nameFromToken);
  }
}

export function clearAuthSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userName');
}

// Fetch for search component

const SEARCH_API_URL = "http://localhost:8000/api/food/search/";

export async function searchRestaurants(payload) {
  const token = localStorage.getItem('token');
  const response = await fetch(SEARCH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await safeJSON(response, {});

  if (!response.ok) {
    throw data;
  }

  return data;
}

// fetch profile data from backend

export async function fetchUserProfile(token = localStorage.getItem('token')) {
  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }

  const response = await fetch("http://localhost:8000/api/auth/profile/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await safeJSON(response);

  if (response.status === 401) {
    clearAuthSession();
    throw new Error('Your session has expired. Please log in again.');
  }

  if (!response.ok) {
    throw data;
  }

  return data;
}

// fetch for profile update

export async function updateUserProfile(updates, token = localStorage.getItem('token')) {
  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }

  const response = await fetch("http://localhost:8000/api/auth/profile/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  const data = await safeJSON(response);

  if (response.status === 401) {
    clearAuthSession();
    throw new Error('Your session has expired. Please log in again.');
  }

  if (!response.ok) {
    throw data;
  }

  return data;
}

// what is the job of fetch in general
// Fetch is a web API that allows you to make network requests to retrieve resources from a server. It provides a modern and flexible way to interact with APIs and handle responses in JavaScript. With fetch, you can send HTTP requests (GET, POST, PUT, DELETE, etc.) to a specified URL and receive a response, which can be processed as JSON, text, or other formats. Fetch is commonly used for tasks like fetching data from an API, submitting form data, or updating content on a webpage without needing to reload the entire page.


