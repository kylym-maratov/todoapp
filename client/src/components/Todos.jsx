import { Accordion, AccordionDetails, AccordionSummary, ButtonGroup, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useAxios } from "../api/api"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useContext, useEffect } from "react";
import { AppContext } from "../store";
import { Loading } from "./Loading";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';

const style = {
    menu: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}

export const Todos = ({ fetchTodos }) => {
    const { state } = useContext(AppContext);
    const { todos, loading } = state;

    useEffect(() => {
        fetchTodos()
    }, [])

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
                <ButtonGroup sx={{ padding: 1 }}>
                    <IconButton type="button"><EditIcon /></IconButton>
                    <IconButton type="button"><PushPinIcon /></IconButton>
                    <IconButton type="button"><DeleteIcon /></IconButton>
                </ButtonGroup>
            </Accordion>
        </>
    )
}