import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api",
});


export const getAllCoaches = async () => {

    console.log('jooope')
  return await API.get("/coach/all");

};

export const createCoach=async(data)=>{

}



export const getCoachLocations = async () => {

  return await API.get("/coach/locations");

};