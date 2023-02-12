import { Backdrop, Box, SpeedDialAction, SpeedDial } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppContext } from "../store";

const actions = [
    { icon: <DarkModeIcon />, name: "DarkMode" }
]

export const SpeedDialComponent = () => {
    const { state, dispatch } = useContext(AppContext);
    const { isDarkTheme } = state;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function changeTheme() {
        dispatch({ type: "CHANGE_THEME", payload: !isDarkTheme });
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