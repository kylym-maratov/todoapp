import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { AppContext } from "../store";

import { UserBlock } from "./UserBlock";

const style = {
    header: {
        padding: "20px 0px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    section: {
        display: "flex",
        alignItems: "center"
    }
}


export const Header = () => {
    const { state } = useContext(AppContext);
    const { userData } = state;
    return (
        <Box sx={{ ...style.header }}>
            <Typography component="h1" fontSize={24} fontWeight="bold">
                TodoApp
            </Typography>
            <Box sx={{ ...style.section }}>
                <Typography>@{userData.username}</Typography>
                <UserBlock />
            </Box>
        </Box>
    )
}