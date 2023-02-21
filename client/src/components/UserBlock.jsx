import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";
import Avatar from '@mui/material/Avatar';
import { IconButton, ListItemButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from "@mui/system";

function stringToColor(string) {
    let hash = 0;
    let i;


    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }


    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


export const UserBlock = () => {
    const { state, dispatch } = useContext(AppContext);
    const { userData } = state;
    const [welcome, setWelcome] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setWelcome(false), 5000);

        return () => clearTimeout(timeout);
    }, []);

    function openMenu() {
        dispatch({ type: "SET_OPEN_MENU", payload: true })
    }

    return (
        <>
            <IconButton type="button" sx={{ marginRight: 2 }}>
                <NotificationsIcon />
            </IconButton>
            <Typography sx={{ marginRight: 2, fontSize: 14, display: welcome ? "block" : "none" }}>Welcome!</Typography>
            <Link to="/profile" style={{ textDecoration: "none" }}><Avatar {...stringAvatar(userData.firstname + " " + userData.lastname)} alt={userData.username} /></Link>
            <IconButton type="button" sx={{ marginLeft: 1 }} onClick={openMenu}>
                <MenuIcon />
            </IconButton>
        </>
    )
}