import axios from "axios";

const baseURL = "http://gateway.marvel.com";

const instance = axios.create({
  baseURL
});

export const get = () => instance
  .get("/v1/public/characters", {
    params: {
      apikey: "0689bc12b6040d69cd87c8e0336e4495",
      limit: 54
    }
  });
