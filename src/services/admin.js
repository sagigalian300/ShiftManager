import { api } from "./api";

export async function getAllBosses() {
  try {
    const response = await api.get("/admin/getAllBosses");
    return response.data;
  } catch (error) {
    console.error("Error fetching all bosses:", error);
    throw error;
  }
}

export async function getAllWorkersForBossId(bossId) {
  try {
    const response = await api.get(`/admin/getAllWorkersForBossId/${bossId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching workers for boss ID ${bossId}:`, error);
    throw error;
  }
}
