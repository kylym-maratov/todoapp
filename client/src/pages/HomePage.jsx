import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useAxios } from "../api/api";
import { AddItem } from "../components/AddItem";
import { Header } from "../components/Header";
import { Todos } from "../components/Todos";
import { AppContext } from "../store";

const style = {
    addItem: {
        display: "flex",
        justifyContent: "center"
    },
    todos: {
        marginTop: 5,
        padding: "0px 5px"
    }
}

export default function HomePape() {
    const { dispatch, state } = useContext(AppContext);
    const { requestApi } = useAxios();

    async function fetchTodos() {
        const { data } = await requestApi("/api/todo/todos");
        dispatch({ type: "SET_TODOS", payload: data.todos });
    }


    return (
        <>
            <Container>
                <Header />
                <Box sx={{ ...style.addItem }}>
                    <AddItem fetchTodos={fetchTodos} />
                </Box>
                <Box sx={{ ...style.todos }}>
                    <Todos fetchTodos={fetchTodos} />
                </Box>
            </Container>
        </>
    )
}