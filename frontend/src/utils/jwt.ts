import axios from "./axios/request";

const setSession = (accessToken?: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const getSession = () => localStorage.getItem("accessToken");

export { getSession, setSession };
