import { Backdrop, Box, SpeedDialAction, SpeedDial } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppContext } from "../store";
import { useAxios } from "../api/api";
import { updateLocalItem } from "../utils/storage.util";

const actions = [
    { icon: <DarkModeIcon />, name: "DarkMode" }
]

function boolTheme(theme) {
    if (theme === "light") return false;

    return true
}

export const SpeedDialComponent = () => {
    const { state, dispatch } = useContext(AppContext);
    const { isDarkTheme, userData } = state;
    const { requestApi } = useAxios();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (userData.isDarkTheme) return dispatch({ type: "SET_THEME", payload: true })

        dispatch({ type: "SET_THEME", payload: false });
    }, [userData.isDarkTheme])

    async function changeTheme() {
        const { data } = await requestApi(`/api/user/change-theme?theme=${!userData.isDarkTheme}`, "PUT");

        updateLocalItem("userdata", { isDarkTheme: data.isDarkTheme });

        dispatch({ type: "SET_USER_THEME", payload: data.isDarkTheme });
    }

    return (
        <Box sx={{ height: 40, flexGrow: 1 }}>
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SettingsIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={changeTheme}
                    />
                ))}
            </SpeedDial>
        </Box>
    )
}