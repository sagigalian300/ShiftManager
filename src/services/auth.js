import { api } from "./api";

export async function status() {
  try {
    const response = await api.get("/status");
    return response.data;
  } catch (error) {
    console.error("Error checking auth status:", error);
    throw error;
  }
}

