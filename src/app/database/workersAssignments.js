import { api } from "./api";

export async function getWeekToAssignTo(encrypted_week_id) {
  try {
    const response = await api.get("/workerAssignments/getWeekToAssignTo");
    return response.data;
  } catch (error) {
    console.log("Error fetching week to assign to");
  }
}

export async function addWorkerSuggestedAssignment(suggestion) {
  try {
    const response = await api.post(
      "/workerAssignments/addWorkerSuggestedAssignment",
      { suggestion }
    );
    return response.data;
  } catch (error) {
    console.log("Error adding worker suggested assignment");
  }
}
