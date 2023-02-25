import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Card, CardActions, CardContent, IconButton, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useAxios } from "../api/api"
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../store";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ColorPicker from "react-pick-color";

function dateNormalaize(createdAt) {
    const date = createdAt.split("T")[0];
    const time = createdAt.split("T")[1].split(".")[0];

    return { date, time }
}

export const TodoCard = ({ item, fetchTodos }) => {
    const { dispatch } = useContext(AppContext);
    const { requestApi } = useAxios();
    const { title, description, createdAt } = item;
    const [viewColorPicker, setViewColorPicker] = useState(false);
    const [colorPicker, setColorPicker] = useState("#fff");

    const [form, setForm] = useState({
        title, description
    });
    const [editMode, setEditMode] = useState({
        title: false, description: false
    });

    const [showToolbar, setShowToolbar] = useState(0);

    const { date, time } = useMemo(() => dateNormalaize(createdAt));

    async function onDeleteTodo() {
        const todoid = item._id;

        if (!todoid) return;

        await requestApi("/api/todo/delete", "DELETE", { todoid });
        fetchTodos()
    }

    async function onAcceptTitleChanged() {
        const todoid = item._id;

        if (!todoid) return;
        await requestApi("/api/todo/update-title", "PUT", { todoid, title: form.title });
        setEditMode({ ...editMode, title: false })
        fetchTodos()
    }

    async function onAcceptDescriptionChanged() {
        const todoid = item._id;

        if (!todoid) return;
        setEditMode({ ...editMode, description: false })
        await requestApi("/api/todo/update-description", "PUT", { todoid, description: form.description });
    }

    async function onTodoPin() {
        const todoid = item._id;
        await requestApi("/api/todo/pin", "PUT", { todoid, pinned: !item.isPinned });
        fetchTodos()
    }

    async function setTodoColor() {
        const todoid = item._id;
        setViewColorPicker(false);
        await requestApi("/api/todo/set-color", "PUT", { todoid, color: colorPicker });
        fetchTodos()
    }

    return (
        <>
            <Card
                sx={{ width: 350, borderRadius: 4 }}
                onMouseEnter={() => setShowToolbar(1)}
                onMouseLeave={() => setShowToolbar(0)}
                style={{ background: item.background ? item.background : "none" }}
            >
                <CardContent>
                    {
                        editMode.title
                            ?
                            <Box display="flex">
                                <TextField fullWidth
                                    type="text" value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    onKeyDown={(e) => e.key === "Enter" ? onAcceptTitleChanged() : null}
                                />
                                <IconButton type="button" sx={{ marginTop: 1 }} onClick={onAcceptTitleChanged}><DownloadDoneIcon /></IconButton>
                            </Box>
                            :
                            <Typography
                                gutterBottom variant="h5" component="div"
                                onDoubleClick={() => setEditMode({ ...editMode, title: true })}
                                onTouchEnd={() => setEditMode({ ...editMode, title: true })}
                            >
                                {form.title}
                            </Typography>
                    }
                    {
                        editMode.description
                            ?
                            <Box display="flex">
                                <TextareaAutosize
                                    style={{ width: "100%", resize: "vertical", background: "none", color: "gray", padding: 10, fontSize: 14 }}
                                    type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    onKeyDown={(e) => e.key === "Enter" ? onAcceptDescriptionChanged() : null}
                                />
                                <IconButton type="button" id={item._id} onClick={onAcceptDescriptionChanged}><DownloadDoneIcon /></IconButton>
                            </Box>
                            :
                            <Typography variant="body2" color="text.secondary"
                                onDoubleClick={() => setEditMode({ ...editMode, description: true })}
                                onTouchEnd={() => setEditMode({ ...editMode, description: true })}
                            >
                                {form.description}
                            </Typography>
                    }
                </CardContent>
                {<CardActions sx={{ display: "flex", justifyContent: "space-between", opacity: showToolbar, transition: "all .3s" }}>
                    <ButtonGroup>
                        <IconButton type="button" onClick={onTodoPin}><PushPinOutlinedIcon /></IconButton>
                        <IconButton type="button" onClick={() => setViewColorPicker(!viewColorPicker)}><ColorLensOutlinedIcon /></IconButton>
                        <IconButton type="button" onClick={onDeleteTodo} name={item._id}><DeleteOutlineOutlinedIcon /></IconButton>
                    </ButtonGroup>
                    <Box textAlign="center">
                        <Typography sx={{ fontSize: 12 }}>  {date}</Typography>
                        <Typography sx={{ fontSize: 12 }}>  {time}</Typography>
                    </Box>
                </CardActions>}
            </Card>
            {viewColorPicker && <Box sx={{ position: "absolute" }} >
                <ColorPicker color={colorPicker} onChange={(color) => setColorPicker(color.hex)} />
                <ButtonGroup>
                    <Button type="button" variant="contained" onClick={setTodoColor}>Save</Button>
                    <Button type="button" variant="contained" onClick={() => { setColorPicker(""); setTodoColor() }}>Reset</Button>
                </ButtonGroup>
            </Box>}
        </>
    )
}


export const TodoList = ({ item }) => {
    const { title, description, createdAt } = item;
    const { date, time } = useMemo(() => dateNormalaize(createdAt));

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
                        <IconButton type="button"><PushPinOutlinedIcon /></IconButton>
                        <IconButton type="button"><DeleteOutlineOutlinedIcon /></IconButton>
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

