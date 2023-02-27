import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Card, CardActions, CardContent, Checkbox, IconButton, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../store";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ColorPicker from "react-pick-color";
import { useTodos } from "../hooks/use.todos";
import { useLocation } from "react-router-dom";

function dateNormalaize(createdAt) {
    const date = createdAt.split("T")[0];
    const time = createdAt.split("T")[1].split(".")[0];

    return { date, time }
}

export const TodoCard = ({ item }) => {
    const { state } = useContext(AppContext);
    const { setTodoCompleted, setRestoreTodo, setTodoDelete, setTodoDescription, setTodoTitle, setTodoPin, setTodoColor, setTodoDeleteForever } = useTodos();
    const { title, description, createdAt } = item;
    const [colorPicker, setColorPicker] = useState(false);
    const [colorHex, setColorHex] = useState("#fff");
    const [showToolbar, setShowToolbar] = useState(0);
    const location = useLocation();
    const [form, setForm] = useState({
        title, description
    });
    const [editMode, setEditMode] = useState({
        title: false, description: false
    });

    const { date, time } = useMemo(() => dateNormalaize(createdAt), []);


    function onAcceptTitle() {
        setTodoTitle({ item, title: form.title })
        setEditMode({ ...editMode, title: false })
    }

    function onAcceptDescription() {
        setTodoDescription({ item, description: form.description })
        setEditMode({ ...editMode, description: false })
    }

    function onTodoDelete() {
        if (location.pathname === "/trash") {
            return setTodoDeleteForever({ item });
        }
        setTodoDelete({ item });

    }

    function onRestoreTodo() {
        setRestoreTodo({ item })
    }

    function onTodoColor() {
        setTodoColor({ item, colorHex })
        setColorPicker(false)
    }

    function onTodoComplete() {
        setTodoCompleted({ item })
    }

    function onTodoPin() {
        setTodoPin({ item })
    }

    function onOpenEditMode(value) {
        setEditMode({ ...editMode, ...value })
    }


    return (
        <>
            {item.isDeleted && <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Todo deleted</Typography>
                <Button type="button" variant="text" onClick={onRestoreTodo}>Restore</Button>
            </Box>}
            <Card
                sx={{ width: 350, borderRadius: 4 }}
                onMouseEnter={() => setShowToolbar(1)}
                onMouseLeave={() => setShowToolbar(0)}
                style={{ background: item.background ? item.background : "none" }}
            >
                <CardContent >
                    {
                        editMode.title
                            ?
                            <Box display="flex">
                                <TextField fullWidth
                                    type="text" value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    onKeyDown={(e) => e.key === "Enter" ? onAcceptTitle() : null}
                                />
                                <IconButton type="button" sx={{ marginTop: 1 }} onClick={onAcceptTitle}><DownloadDoneIcon /></IconButton>
                            </Box>
                            :
                            <Typography
                                gutterBottom variant="h5" component="div"
                                onDoubleClick={() => onOpenEditMode({ title: true })}
                                onTouchEnd={() => onOpenEditMode({ title: true })}
                            >
                                {form.title}
                            </Typography>
                    }
                    {
                        editMode.description
                            ?
                            <Box display="flex">
                                <TextareaAutosize
                                    style={{ width: "100%", resize: "vertical", background: "none", color: state.isDarkTheme ? "white" : "black", padding: 10, fontSize: 14 }}
                                    type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    onKeyDown={(e) => e.key === "Enter" ? onAcceptDescription() : null}
                                />
                                <IconButton type="button" id={item._id} onClick={onAcceptDescription}><DownloadDoneIcon /></IconButton>
                            </Box>
                            :
                            <Typography variant="body2" color="text.secondary"
                                onDoubleClick={() => onOpenEditMode({ description: true })}
                                onTouchEnd={() => onOpenEditMode({ description: true })}
                            >
                                {form.description}
                            </Typography>
                    }
                </CardContent>
                {<CardActions sx={{ display: "flex", justifyContent: "space-between", opacity: showToolbar, transition: "all .3s" }}>
                    <ButtonGroup>
                        <IconButton type="button" onClick={onTodoPin}><PushPinOutlinedIcon /></IconButton>
                        <IconButton type="button" onClick={() => setColorPicker(!colorPicker)}><ColorLensOutlinedIcon /></IconButton>
                        <IconButton type="button" onClick={onTodoDelete} name={item._id}><DeleteOutlineOutlinedIcon /></IconButton>
                        <Checkbox checked={item.isCompleted} inputProps={{ 'aria-label': 'controlled' }} onClick={onTodoComplete} />
                    </ButtonGroup>
                    <Box textAlign="center">
                        <Typography sx={{ fontSize: 12 }}>  {date}</Typography>
                        <Typography sx={{ fontSize: 12 }}>  {time}</Typography>
                    </Box>
                </CardActions>}
            </Card>
            {colorPicker && <Box sx={{ position: "absolute" }} >
                <ColorPicker color={colorHex} onChange={(color) => setColorHex(color.hex)} />
                <ButtonGroup>
                    <Button type="button" variant="contained" onClick={onTodoColor}>Save</Button>
                    <Button type="button" variant="contained" onClick={() => { setColorHex(""); onTodoColor() }}>Reset</Button>
                    <Button type="button" variant="contained" onClick={() => setColorPicker(false)}>Cancel</Button>
                </ButtonGroup>
            </Box>}
        </>
    )
}

export const TodoList = ({ item }) => {
    const { title, description, createdAt } = item;
    const { date, time } = useMemo(() => dateNormalaize(createdAt), []);

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

