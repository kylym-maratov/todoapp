import { Accordion, AccordionDetails, AccordionSummary, ButtonGroup, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useAxios } from "../api/api"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useContext, useEffect } from "react";
import { AppContext } from "../store";
import { Loading } from "./Loading";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const style = {
    menu: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}

export const Todos = () => {
    const { state, dispatch } = useContext(AppContext);
    const { requestApi } = useAxios();
    const { todos, loading } = state;

    useEffect(() => {
        fetchTodos()
    }, [])

    async function fetchTodos() {
        const { data } = await requestApi("/api/todo/todos");
        dispatch({ type: "SET_TODOS", payload: data.todos });
    }

    return (
        <Box>
            {todos.length ?
                <Box>
                    <Box sx={{ ...style.menu }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Todos
                        </Typography>
                        <ButtonGroup >
                            <IconButton type="button" >
                                <DashboardIcon />
                            </IconButton>
                            <IconButton type="button">
                                <FormatListBulletedIcon />
                            </IconButton>
                        </ButtonGroup>
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        {todos.map((item, key) => <Todo item={item} key={key} />)}
                    </Box>
                </Box> :
                <Box display="flex" justifyContent="center">
                    {loading ? <Loading /> : null}
                </Box>
            }
            {!todos.length && !loading && <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                You don't have any tasks created yet, you can create a new task above in the input box. If something is not clear go to the info page
            </Typography>}
        </Box>
    )
}


const Todo = ({ item }) => {

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> {item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {item.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}