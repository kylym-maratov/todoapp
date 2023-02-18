import { useContext, useEffect } from "react"
import { AppContext } from "../store"
import { destroyLocalItem, getLocalItem, setLocalItem } from "../utils/storage.util";

export const useAuth = () => {
    const { dispatch } = useContext(AppContext);

    useEffect(() => {
        const userData = getLocalItem("userdata");
        const userToken = getLocalItem("usertoken");
        console.log(userData, userToken)

        if (userData && userToken) {
            login(userData, userToken);
        }
    }, [])

    function login(userData, userToken) {
        dispatch({ type: "SET_USERDATA", payload: userData });
        dispatch({ type: "SET_ACCESS_TOKEN", payload: userToken.accessToken });
        setLocalItem("userdata", userData);
        setLocalItem("usertoken", userToken);
    }

    function logout() {
        dispatch({ type: "SET_USER_DATA", payload: null });
        dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
        destroyLocalItem("userdata");
        destroyLocalItem("usertoken");
    }

    return { login, logout }
}