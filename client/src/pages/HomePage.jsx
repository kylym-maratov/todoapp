
import { Box } from "@mui/system";
import React, { useEffect } from "react";

import { AddItem } from "../components/AddItem";
import { Header } from "../components/Header";
import { Todos } from "../components/Todos";
import { useTodos } from "../hooks/use.todos";


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
    const { setLoadConent } = useTodos()

    useEffect(() => {
        setLoadConent(true)
    }, []);

    return (
        <>
            <Header />
            <Box sx={{ ...style.addItem }}>
                <AddItem />
            </Box>
            <Box sx={{ ...style.todos }}>
                <Todos />
            </Box>
        </>
    )
}