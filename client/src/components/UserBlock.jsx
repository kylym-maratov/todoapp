import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";
import Avatar from '@mui/material/Avatar';
import { ButtonGroup, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from "@mui/system";
import { Loading } from "./Loading";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAxios } from "../api/api";
import { useTodos } from "../hooks/use.todos";

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
    const location = useLocation();
    const { state, dispatch } = useContext(AppContext);
    const { userData, loading } = state;
    const [welcome, setWelcome] = useState(location.pathname === "/");
    const { setLoadConent } = useTodos()

    useEffect(() => {
        const timeout = setTimeout(() => setWelcome(false), 5000);

        return () => clearTimeout(timeout);
    }, []);

    function openMenu() {
        dispatch({ type: "SET_OPEN_MENU", payload: true })
    }


    async function fetchContent() {
        if (location.pathname === "/") {
            return setLoadConent(true)
        }

        if (location.pathname === "/profile") {
            return
        }
    }


    return (
        <>
            <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
                {loading
                    ?
                    <Box sx={{ marginRight: 2, marginTop: 1 }}>
                        <Loading />
                    </Box> :
                    <IconButton type="button" onClick={fetchContent}>
                        <RefreshIcon />
                    </IconButton>
                }
                <IconButton type="button" sx={{ marginRight: 2 }}>
                    <NotificationsIcon />
                </IconButton>
                <Typography sx={{ marginRight: 2, fontSize: 14, display: welcome ? "block" : "none" }}>Welcome!</Typography>
                <Link to="/profile" style={{ textDecoration: "none" }}
                ><Avatar
                        {...stringAvatar(userData.firstname + " " + userData.lastname)}
                        alt={userData.username}
                    /></Link>
                <IconButton type="button" sx={{ marginLeft: 1 }} onClick={openMenu}>
                    <MenuIcon />
                </IconButton>
            </ButtonGroup>
        </>
    )
}