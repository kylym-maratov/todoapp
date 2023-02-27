import { ButtonGroup, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";
import styled from "@emotion/styled";
import { TodoCard, TodoList } from "./Todo";
import { useTodos } from "../hooks/use.todos";

const style = {
    menu: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}

const Item = styled(Paper)(({ theme }) => ({
    background: "none",
    padding: theme.spacing(1),
    boxShadow: "none"
}));


export const Todos = () => {
    const { state } = useContext(AppContext);
    const { todos, loading, pinned } = state;
    const [view, setView] = useState("card");

    return (
        <Box>
            <Box sx={{ ...style.menu }}>
                {pinned.length ? <Typography>Pinned</Typography> : null}
                <ButtonGroup >
                    <IconButton type="button" onClick={() => setView("card")} >
                        <DashboardIcon />
                    </IconButton>
                    <IconButton type="button" onClick={() => setView("list")}>
                        <FormatListBulletedIcon />
                    </IconButton>
                </ButtonGroup>
            </Box>
            {pinned.length ? <Box sx={{ marginTop: 3 }}>
                <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                    {pinned.map((item) => (
                        <Grid key={item._id}  >
                            <Item><TodoCard item={item} /></Item>
                        </Grid>
                    ))}
                </Grid>
            </Box> : null}
            {todos.length ?
                <Box>

                    {view === "list" ?
                        <Box sx={{ marginTop: 3 }}>
                            {todos.map((item, key) => (
                                <TodoList item={item} key={item._id} />
                            ))}
                        </Box>
                        :
                        <Box sx={{ marginTop: 3 }}>
                            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                                {todos.map((item, key) => (
                                    <Grid key={item._id}  >
                                        <Item><TodoCard item={item} /></Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    }
                </Box> :
                <Box display="flex" justifyContent="center">
                    {loading && <Typography fontWeight="bold">Getting todos...</Typography>}
                </Box>
            }
            {
                !todos.length && !pinned.length && !loading && <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                    You don't have any tasks created yet, you can create a new task above in the input box. If something is not clear go to the info page
                </Typography>
            }
        </Box >
    )
}




