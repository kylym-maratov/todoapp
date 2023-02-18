import { Alert, Snackbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";

export const AlertComponent = () => {
    const { state } = useContext(AppContext);
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
            setOpen(false);
        }, 5000)

        return () => clearTimeout(timeout);
    }, [open])

    return (
        <Snackbar open={open}>
            <Alert onClose={() => setOpen(false)} severity={type} sx={{ width: '100%' }}>
                {error || message}
            </Alert>
        </Snackbar>
    )
}