import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../store";
import { getLocalItem } from "../utils/storage.util";


export const useAxios = () => {
    const { dispatch } = useContext(AppContext);

    useEffect(() => {
        axios.interceptors.request.use(function (config) {
            dispatch({ type: "SET_LOADING", payload: true });
            dispatch({ type: "SET_ERROR", payload: "" });
            config.headers.set("Content-Type", "application/json");

            const accesstoken = getLocalItem("accesstoken");

            if (accesstoken) {
                config.headers.set("authorization", accesstoken)
            }

            return config;
        }, function (error) {
            return Promise.reject(error);
        });


        axios.interceptors.response.use(function (response) {
            dispatch({ type: "SET_LOADING", payload: false });
            return response;

        }, function (error) {
            dispatch({ type: "SET_ERROR", payload: error.response.data.message || error.message })
            dispatch({ type: "SET_LOADING", payload: false });
            return Promise.reject(error);
        });
    }, [])


    const requestApi = async (url = "", method = "GET", data) => {
        return await axios.request({ url, method, data: JSON.stringify(data ? data : {}) });
    }

    return { requestApi };
}