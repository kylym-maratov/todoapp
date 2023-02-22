import { Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useAxios } from "../api/api"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../store";
import { Loading } from "./Loading";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import styled from "@emotion/styled";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';


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


function dateNormolaize(createdAt) {
    const date = createdAt.split("T")[0];
    const time = createdAt.split("T")[1].split(".")[0];

    return { date, time }
}


export const Todos = ({ fetchTodos }) => {
    const { state } = useContext(AppContext);
    const { todos, loading } = state;
    const [view, setView] = useState("card");

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
                            <IconButton type="button" onClick={() => setView("card")} >
                                <DashboardIcon />
                            </IconButton>
                            <IconButton type="button" onClick={() => setView("list")}>
                                <FormatListBulletedIcon />
                            </IconButton>
                        </ButtonGroup>
                    </Box>
                    {view === "list" ?
                        <Box sx={{ marginTop: 3 }}>
                            {todos.map((item, key) => (
                                <TodoList item={item} key={key} />
                            ))}
                        </Box>
                        :
                        <Box sx={{ marginTop: 3 }}>
                            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                                {todos.map((item, key) => (
                                    <Grid key={key}  >
                                        <Item><TodoCard item={item} /></Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    }
                </Box> :
                <Box display="flex" justifyContent="center">
                    {loading ? <Loading /> : null}
                </Box>
            }
            {
                !todos.length && !loading && <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                    You don't have any tasks created yet, you can create a new task above in the input box. If something is not clear go to the info page
                </Typography>
            }
        </Box >
    )
}




const TodoList = ({ item }) => {
    const { title, description, createdAt } = item;
    const { date, time } = useMemo(() => dateNormolaize(createdAt));

    return (
        <>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> {title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {description}
                    </Typography>
                </AccordionDetails>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <ButtonGroup sx={{ padding: 1 }}>
                        <IconButton type="button"><EditIcon /></IconButton>
                        <IconButton type="button"><PushPinIcon /></IconButton>
                        <IconButton type="button"><DeleteIcon /></IconButton>
                    </ButtonGroup>
                    <Box textAlign="center" marginRight={2}>
                        <Typography fontSize={10}>{time}</Typography>
                        <Typography fontSize={10}>{date}</Typography>
                    </Box>
                </Box>
            </Accordion>
        </>
    )
}


const TodoCard = ({ item }) => {
    const { title, description, createdAt } = item;
    const [form, setForm] = useState({
        title, description
    })
    const [editMode, setEditMode] = useState({
        title: false, description: false
    })

    const { date, time } = useMemo(() => dateNormolaize(createdAt));

    return (
        <Card sx={{ width: 350, borderRadius: 4 }}>
            <CardContent>
                {
                    editMode.title
                        ?
                        <Box display="flex">
                            <TextField fullWidth
                                type="text" value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                onBlur={() => setEditMode({ ...editMode, title: false })}
                            />
                            <IconButton type="button" sx={{ marginTop: 1 }} onClick={() => setEditMode({ ...editMode, title: false })}><DownloadDoneIcon /></IconButton>
                        </Box>
                        :
                        <Typography
                            gutterBottom variant="h5" component="div"
                            onDoubleClick={() => setEditMode({ ...editMode, title: true })}
                            onTouchEnd={() => setEditMode({ ...editMode, title: true })}
                        >
                            {title}
                        </Typography>
                }
                {
                    editMode.description
                        ?
                        <Box display="flex">
                            <TextareaAutosize
                                onBlur={() => setEditMode({ ...editMode, description: false })}
                                style={{ width: "100%", resize: "vertical", background: "none", color: "gray", padding: 10, fontSize: 14 }}
                                type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                            <IconButton type="button" onClick={() => setEditMode({ ...editMode, description: false })}><DownloadDoneIcon /></IconButton>
                        </Box>
                        :
                        <Typography variant="body2" color="text.secondary"
                            onDoubleClick={() => setEditMode({ ...editMode, description: true })}
                            onTouchEnd={() => setEditMode({ ...editMode, description: true })}
                        >
                            {description}
                        </Typography>
                }
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <ButtonGroup>
                    <IconButton type="button"><PushPinIcon /></IconButton>
                    <IconButton type="button"><DeleteIcon /></IconButton>
                </ButtonGroup>
                <Box textAlign="center">
                    <Typography fontSize={10}>{time}</Typography>
                    <Typography fontSize={10}>{date}</Typography>
                </Box>
            </CardActions>
        </Card>
    )
}