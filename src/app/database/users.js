import { api } from "./api";

export async function loginUser(username, password) {
  try {
    const response = await api.post("user/login", { username, password });

    // Assuming the backend returns { token: '...', user: {...} }
    return response.data;
  } catch (error) {
    // Log the error and re-throw it so the component can handle it
    console.error(
      "Login failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message || "Login failed due to an unknown error."
    );
  }
}

export async function logoutUser() {
  try {
    const response = await api.post("user/logout");
    return response.data;
  } catch (error) {
    // Log the error and re-throw it so the component can handle it
    console.error(
      "logout failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message || "Logout failed due to an unknown error."
    );
  }
}
