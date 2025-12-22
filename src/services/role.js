import { api } from "./api";

export async function addRole(name, desc, numOfWorkers) {
  try {
    const response = await api.post("role/addRole", {
      name,
      desc,
      numOfWorkers,
    });

    return response.data;
  } catch (error) {
    // Log the error and re-throw it so the component can handle it
    console.error(
      "adding role failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Adding role failed due to an unknown error."
    );
  }
}

export async function deleteRole(roleId) {
  try {
    const response = await api.delete(`role/deleteRole/${roleId}`);
    return response.data;
  } catch (error) {
    console.error(
      "deleting role failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Deleting role failed due to an unknown error."
    );
  }
}

export async function getAllRoles() {
  try {
    const response = await api.get("role/getAllRoles");
    return response.data.data;
  } catch (error) {
    console.error(
      "fetching roles failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Fetching roles failed due to an unknown error."
    );
  }
}

export async function updateRole(roleId, name, desc, numOfWorkers) {
  try {
    const response = await api.put(`role/updateRole/${roleId}`, {
      name,
      desc,
      numOfWorkers,
    });
    return response.data;
  } catch (error) {
    console.error(
      "updating role failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Updating role failed due to an unknown error."
    );
  }
}
