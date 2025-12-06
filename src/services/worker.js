import { api } from "./api";
export async function addWorker(
  firstName,
  lastName,
  email,
  phone,
  salary,
  roles,
  password,
  rank
) {
  try {
    const response = await api.post("/worker/addWorker", {
      firstName,
      lastName,
      email,
      phone,
      salary,
      roles,
      password,
      rank,
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

export async function updateWorkerDetails(
  id,
  first_name,
  last_name,
  email,
  phone,
  salary,
  roles,
  password,
  rank
) {
  try {
    const response = await api.post("/worker/updateWorkerDetails", {
      worker_id: id,
      first_name,
      last_name,
      email,
      phone,
      salary,
      roles,
      password,
      rank,
    });
    return response.data;
  } catch (error) {
    console.log("Error updating worker details");
  }
}

export async function delWorker(workerId) {
  try {
    const response = await api.delete(`/worker/deleteWorker/${workerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting worker with ID ${workerId}:`, error);
    throw new Error("Failed to delete worker.");
  }
}

export async function workerLogin(
  name,
  password,
  encrypted_boss_id,
  encrypted_week_id
) {
  try {
    const response = await api.post("/worker/workerLogin", {
      name,
      password,
      encrypted_boss_id,
      encrypted_week_id,
    });
    return response.data;
  } catch (error) {
    console.log("Error logging in worker");
  }
}
