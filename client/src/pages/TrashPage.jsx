import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { useAxios } from "../api/api";
import { Header } from "../components/Header";
import { TodoCard } from "../components/Todo";
import { AppContext } from "../store";


const Item = styled(Paper)(({ theme }) => ({
    background: "none",
    padding: theme.spacing(1),
    boxShadow: "none"
}));

export default function TrashPage() {
    const { dispatch, state } = useContext(AppContext);
    const { deleted } = state;
    const { requestApi } = useAxios()

    useEffect(() => { fetchTodos() }, []);

    async function fetchTodos() {
        const { data } = await requestApi("/api/todo/todos");
        dispatch({ type: "SET_TODOS", payload: data.todos });
        dispatch({ type: "SET_PINNED", payload: data.pinned });
        dispatch({ type: "SET_DELETED", payload: data.deleted });
    }

    return (
        <>
            <Header />
            <Box sx={{ marginTop: 3, textAlign: "center" }}>
                {deleted.length ? <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                    {deleted.map((item, key) => (
                        <Grid key={item._id} >
                            <Item><TodoCard item={item} fetchTodos={fetchTodos} /></Item>
                        </Grid>
                    ))}
                </Grid> : "Trash empty"}
            </Box>
        </>
    )
}