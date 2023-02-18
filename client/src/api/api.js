import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../store";
import { getLocalItem } from "../utils/storage.util";


export const useAxios = () => {
    const { dispatch } = useContext(AppContext);
    const user = getLocalItem("userData");

    axios.defaults.baseURL = "/";

    axios.interceptors.request.use(function (config) {
        dispatch({ type: "SET_LOADING", payload: true })
        dispatch({ type: "SET_ERROR", payload: "" })
        config.headers.set("Content-Type", "application/json");

        if (user && user.token) {
            config.headers.set("Authorization", "Bearer " + user.token)
        }

        return config;
    }, function (error) {

        return Promise.reject(error);
    });


    axios.interceptors.response.use(function (response) {
        dispatch({ type: "SET_LOADING", payload: false })
        return response;
    }, function (error) {

        dispatch({ type: "SET_LOADING", payload: false })
        dispatch({ type: "SET_ERROR", payload: error.response.data.message || error.message })
        return Promise.reject(error);
    });


    const requestApi = (url = "", method = "GET", data = null, headers = {}) => {
        return axios.request({ url, method, data: JSON.stringify(data), headers });
    }

    return { requestApi };
}