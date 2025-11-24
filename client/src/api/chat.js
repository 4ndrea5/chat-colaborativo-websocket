import axios from "axios";

const API_URL = "http://localhost:4000/api/chat";

export const getChats = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
};

export const createChat = async (name) => {
  const res = await axios.post(API_URL, { name }, { withCredentials: true });
  return res.data;
};
