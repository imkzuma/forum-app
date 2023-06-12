import axios from "axios";

export const ForumApi = axios.create({
  baseURL: "https://forum.tudemaha.my.id",
  headers: {
    'Content-Type': 'application/json'
  }
});