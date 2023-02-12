import { Alert, Snackbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";


export const AlertComponent = () => {
    const { state, dispatch } = useContext(AppContext);

    const { alert } = state;

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        type: 'error',
        message: ''
    });

    useEffect(() => {

    }, [state.alert])

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity={data.type} sx={{ width: '100%' }}>
                {data.message}
            </Alert>
        </Snackbar>
    )
}