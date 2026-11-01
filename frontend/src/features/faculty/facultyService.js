import { apiRequest } from "@/services/api";

const FACULTY_ENDPOINT = "/faculty";

// View Faculty - All faculty list
export const getAllFaculty = () => {
  return apiRequest(FACULTY_ENDPOINT);
};

// View Faculty by ID
export const getFacultyById = (id) => {
  return apiRequest(`${FACULTY_ENDPOINT}/${id}`);
};

// Add Faculty - New faculty register
export const createFaculty = (facultyData) => {
  return apiRequest(FACULTY_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(facultyData),
  });
};

// Edit Faculty - Details update
export const updateFaculty = (id, facultyData) => {
  return apiRequest(`${FACULTY_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify(facultyData),
  });
};

// Delete Faculty - Faculty remove
export const deleteFaculty = (id) => {
  return apiRequest(`${FACULTY_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
};

