import { api } from "./api";

export async function addWeeklyShifts(days) {
  console.log(days);
  try {
    const response = await api.post("shift/addWeeklyShifts", days);
    return response.data;
  } catch (error) {
    console.error(
      "Adding weekly shifts failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Adding weekly shifts failed due to an unknown error."
    );
  }
}

export async function getAllWeeks() {
  try {
    const response = await api.get(`shift/getAllWeeks`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetching weeks failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Fetching weeks failed due to an unknown error."
    );
  }
}

export async function getDaysByWeekId(week_id) {
  try {
    const response = await api.get(`shift/getDaysByWeekId/${week_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetching days by week ID failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Fetching days by week ID failed due to an unknown error."
    );
  }
}
