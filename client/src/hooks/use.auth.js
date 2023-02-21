import { useContext, useEffect } from "react"
import { AppContext } from "../store"
import { destroyLocalItem, getLocalItem, setLocalItem } from "../utils/storage.util";

export const useAuth = () => {
    const { dispatch } = useContext(AppContext);

    useEffect(() => {
        const userData = getLocalItem("userdata");
        const accessToken = getLocalItem("accesstoken");


        if (userData && accessToken) {
            login(userData, accessToken);
        }
    }, [])

    function login(userData, accessToken) {
        dispatch({ type: "SET_USER_DATA", payload: userData });
        dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
        setLocalItem("userdata", userData);
        setLocalItem("accesstoken", accessToken);
    }

    function logout() {
        dispatch({ type: "SET_USER_DATA", payload: null });
        dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
        destroyLocalItem("userdata");
        destroyLocalItem("accesstoken");
    }

    return { login, logout }
}