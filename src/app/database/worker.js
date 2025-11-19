import { api } from "./api";
export async function addWorker(
  firstName,
  lastName,
  email,
  phone,
  salary,
  roles
) {
  try {
    const response = await api.post("/worker/addWorker", {
      firstName,
      lastName,
      email,
      phone,
      salary,
      roles,
    });
    return response.data;
  } catch (error) {
    console.log("Error adding worker");
  }
}

export async function getAllWorkers() {
  try {
    const response = await api.get("/worker/getAllWorkers");
    return response.data;
  } catch (error) {
    console.log("Error fetching workers");
  }
}
