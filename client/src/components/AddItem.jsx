import { Button, ButtonGroup, IconButton, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from "@mui/system";
import { AppContext } from "../store";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAxios } from "../api/api";

const style = {
    main: {
        width: "600px",
        marginTop: 4,
        borderRadius: 4,
        border: "1px solid gray"
    },
    editor: {
        overflow: "hidden", padding: 5, minHeight: 150
    },
    wrapper: {
        padding: 5
    },
    toolbar: {
        border: "none", color: "gray"
    }
}


export const AddItem = () => {
    const { state, dispatch } = useContext(AppContext);
    const { isDarkTheme } = state;


    const [showForm, setShowForm] = useState(false);
    const [descState, setDescState] = useState("");
    const [title, setTitle] = useState("");
    const [hiddenToolbar, setHiddenToolbar] = useState(true);
    const { requestApi } = useAxios();


    function onDecodeDrafjs() {
        return descState.getCurrentContent().getPlainText('\u0001');
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(`${title} ${onDecodeDrafjs()}`);
        dispatch({ type: "SET_MESSAGE", payload: "Text copied to clipboard!" });
    }

    function onClearFields() {
        setTitle("");
        setDescState("");
    }

    function onDiscard() {
        onClearFields();
        setShowForm(false);
    }

    async function onCreateTodo() {
        const description = onDecodeDrafjs()
        if (!title && !description) return;
        onDiscard()
        await requestApi("/api/todo/create", "POST", { title, description })
        const { data } = await requestApi("/api/todo/todos");
        dispatch({ type: "SET_TODOS", payload: data.todos });
        dispatch({ type: "SET_PINNED", payload: data.pinned });
    }

    return (
        <>
            <Box sx={{ ...style.main, background: isDarkTheme ? "#212120" : "white", border: !isDarkTheme && "2px solid whitesmoke" }}>
                <form>
                    <TextField
                        fullWidth
                        type="text"
                        placeholder={showForm ? "Title" : "Take a note..."}
                        onClick={() => setShowForm(true)}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </TextField>
                    {showForm && <Box sx={{ marginTop: !hiddenToolbar ? 4 : 0 }}>
                        <Editor
                            editorState={descState}
                            editorStyle={{ background: isDarkTheme ? "#212120" : "white", overflow: "hidden", padding: 5, height: "auto" }}
                            wrapperStyle={{ ...style.wrapper, background: isDarkTheme ? "#212120" : "white", }}
                            toolbarStyle={{ ...style.toolbar, background: isDarkTheme ? "#212120" : "white" }}
                            placeholder="Take a note..."
                            onEditorStateChange={setDescState}
                            toolbarHidden={hiddenToolbar}
                        />
                        <Box sx={{ padding: 1, display: 'flex', justifyContent: "space-between" }}>
                            <Box>
                                <ButtonGroup sx={{}}>
                                    <IconButton onClick={() => setHiddenToolbar(!hiddenToolbar)}><AutoFixHighIcon /> </IconButton>
                                    <IconButton onClick={copyToClipboard}><ContentCopyIcon /> </IconButton>
                                    <IconButton onClick={onClearFields}><ClearIcon /></IconButton>
                                </ButtonGroup>
                            </Box>
                            <Box>
                                <ButtonGroup>
                                    <Button variant="text" type="button" onClick={onDiscard}>Close</Button>
                                    <Button variant="outlined" type="button" onClick={onCreateTodo}>Create</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>}
                </form>
            </Box >
        </>
    )
}