import axios from "axios";

let api = axios.create({
    baseURL: "https://advanced-crud-be.onrender.com"
});

// get
export const fetchData = async () => {
  return await api.get('/students');
}

// post
export const postmethood = async (stud) => {
  return await api.post('/students', stud);
}

// delete
export const deletemethood = async (id) => {
  return await api.delete(`/students/${id}`);
}

// edit
export const editmethod = async (id, data) => {
  return await api.put(`/students/${id}`, data);
}