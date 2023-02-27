import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { useAxios } from "../api/api";
import { Header } from "../components/Header";
import { TodoCard } from "../components/Todo";
import { useTodos } from "../hooks/use.todos";
import { AppContext } from "../store";

const Item = styled(Paper)(({ theme }) => ({
    background: "none",
    padding: theme.spacing(1),
    boxShadow: "none"
}));

export default function TrashPage() {
    const { state } = useContext(AppContext);
    const { deleted } = state;

    const { setLoadConent } = useTodos()

    useEffect(() => {
        setLoadConent(true)
    }, []);
    return (
        <>
            <Header />
            <Box sx={{ marginTop: 3, textAlign: "center" }}>
                {deleted.length ? <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                    {deleted.map((item, key) => (
                        <Grid key={item._id} >
                            <Item><TodoCard item={item} /></Item>
                        </Grid>
                    ))}
                </Grid> : "Trash empty"}
            </Box>
        </>
    )
}