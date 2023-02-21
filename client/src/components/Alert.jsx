import { Alert, Snackbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";

export const AlertComponent = () => {
    const { state, dispatch } = useContext(AppContext);
    const { error, message } = state;
    const [open, setOpen] = useState();
    const [type, setType] = useState("info");

    useEffect(() => {
        if (error) {
            setType("error");
            return setOpen(true)
        }
        if (message) {
            setType("info");
            return setOpen(true)
        }

        setOpen(false)
    }, [error, message])

    useEffect(() => {
        const timeout = setTimeout(() => {
            closeAlert()
        }, 5000)

        return () => clearTimeout(timeout);
    }, [open])

    function closeAlert() {
        setOpen(false);
        dispatch({ type: "SET_MESSAGE", payload: "" });
        dispatch({ type: "SET_ERROR", payload: "" });
    }

    return (
        <Snackbar open={open}>
            <Alert onClose={closeAlert} severity={type} sx={{ width: '100%' }}>
                {error || message}
            </Alert>
        </Snackbar>
    )
}