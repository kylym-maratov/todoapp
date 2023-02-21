import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { AddItem } from "../components/AddItem";
import { Header } from "../components/Header";
import { Todos } from "../components/Todos";

const style = {
    addItem: {
        display: "flex",
        justifyContent: "center"
    },
    todos: {
        marginTop: 10,
        padding: "0px 5px"
    }
}

export default function HomePape() {


    return (
        <>
            <Container>
                <Header />
                <Box sx={{ ...style.addItem }}>
                    <AddItem />
                </Box>
                <Box sx={{ ...style.todos }}>
                    <Todos />
                </Box>
            </Container>
        </>
    )
}