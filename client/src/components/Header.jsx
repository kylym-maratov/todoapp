import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store";

import { UserBlock } from "./UserBlock";

const style = {
    header: {
        padding: "15px 0px",
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

    return (
        <Box sx={{ ...style.header }}>
            <Link to="/" style={{ color: state.isDarkTheme ? "white" : "black", textDecoration: "none" }}>
                <Typography component="h1" fontSize={24} fontWeight="bold">
                    TodoApp
                </Typography></Link>
            <Box sx={{ ...style.section }}>
                <UserBlock />
            </Box>
        </Box>
    )
}