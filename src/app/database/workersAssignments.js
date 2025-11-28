import { api } from "./api";

export async function getDaysToAssignTo() {
  try {
    // Didnt do that yet in the backend
    const response = await api.get("/workerAssignments/getDaysToAssignTo");
    return response.data;
  } catch (error) {
    console.log("Error fetching days to assign to");
  }
}
