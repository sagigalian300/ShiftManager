import { api } from "./api";

export async function getWeekToAssignTo() {
  try {
    const response = await api.get("/workerAssignments/getWeekToAssignTo");
    console.log("Response data:", response.data);
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

export async function getWorkersSuggestionsForWeek(weekId) {
  try {
    const response = await api.get(
      `/workerAssignments/getWorkersSuggestionsForWeek/${weekId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching workers suggestions for week");
  }
}
