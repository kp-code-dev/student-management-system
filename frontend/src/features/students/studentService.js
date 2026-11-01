
import { apiRequest } from "@/services/api";

const STUDENTS_ENDPOINT = "/students";

export const getAllStudents = () => {
  return apiRequest(STUDENTS_ENDPOINT);
};

export const getStudentById = (id) => {
  return apiRequest(`${STUDENTS_ENDPOINT}/${id}`);
};

export const createStudent = (studentData) => {
  return apiRequest(STUDENTS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(studentData),
  });
};

export const updateStudent = (id, studentData) => {
  return apiRequest(`${STUDENTS_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify(studentData),
  });
};

export const deleteStudent = (id) => {
  return apiRequest(`${STUDENTS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
};

export const getMyStudentProfile = () => {
  return apiRequest(`${STUDENTS_ENDPOINT}/me`);
};

export const updateMyStudentProfile = (profileData) => {
  return apiRequest(`${STUDENTS_ENDPOINT}/me`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};
