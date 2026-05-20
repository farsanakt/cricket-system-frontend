import axios from "axios";

const API = axios.create({
  baseURL:
    "https://cricket-backend-chwe.onrender.com/api",
});


export const getAllCoaches = async () => {

  return await API.get("/coach/all");

};



export const getCoachLocations = async () => {

  return await API.get("/coach/locations");

};