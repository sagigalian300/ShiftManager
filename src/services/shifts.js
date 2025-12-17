import { api } from "./api";

export async function addWeeklyShifts(days) {
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

export async function deleteWeek(week_id) {
  try {
    const response = await api.delete(`shift/deleteWeek/${week_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Deleting week failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Deleting week failed due to an unknown error."
    );
  }
}

export async function addShiftAssignments(shift_data) {
  try {
    const response = await api.post("shift/addShiftAssignments", shift_data);
    return response.data;
  } catch (error) {
    console.error(
      "Adding shift ssignments failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Adding shift ssignments failed due to an unknown error."
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

export async function getShiftsByDayId(day_id) {
  try {
    const response = await api.get(`shift/getShiftsByDayId/${day_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetching shifts by day ID failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Fetching shifts by day ID failed due to an unknown error."
    );
  }
}

export async function getShiftsAssignments(shift_id) {
  try {
    const response = await api.get(`shift/getShiftAssignments/${shift_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetching shifts assignments failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Fetching shifts assignments failed due to an unknown error."
    );
  }
}

export async function getEncryptedBossAndWeek(week_id) {
  try {
    const response = await api.get(`shift/getEncryptedBossAndWeek/${week_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetching encrypted boss and week failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Fetching encrypted boss and week failed due to an unknown error."
    );
  }
}

export async function computeOptimalAssignment(week_id) {
  try {
    const response = await api.get(`shift/smartWeeklyShiftsBuilder/${week_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Computing optimal assignment failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Computing optimal assignment failed due to an unknown error."
    );
  }
}

export async function getWeekDataForExcelDocument(week_id) {
  try {
    const response = await api.get(
      `shift/getWeekDataForExcelDocument/${week_id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Fetching week data for Excel document failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Fetching week data for Excel document failed due to an unknown error."
    );
  }
}

export async function deleteShift(shift_id) {
  try {
    const response = await api.delete(`shift/deleteShift/${shift_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Deleting shift failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Deleting shift failed due to an unknown error."
    );
  }
}
