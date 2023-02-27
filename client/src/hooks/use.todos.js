import { useContext, useEffect, useState } from "react";
import { useAxios } from "../api/api";
import { AppContext } from "../store";




export const useTodos = () => {
    const { dispatch } = useContext(AppContext);
    const [loadContent, setLoadConent] = useState(false);
    const { requestApi } = useAxios();

    useEffect(() => {
        async function fetchTodos() {
            const { data } = await requestApi("/api/todo/todos");
            dispatch({ type: "SET_TODOS", payload: data.todos });
            dispatch({ type: "SET_PINNED", payload: data.pinned });
            dispatch({ type: "SET_DELETED", payload: data.deleted || [] });
        }

        if (loadContent) {
            fetchTodos()
            setLoadConent(false)
        }

    }, [loadContent])


    async function setTodoDelete({ item }) {
        const todoid = item._id;

        if (!todoid) return;

        const { data } = await requestApi("/api/todo/delete", "DELETE", { todoid });
        setLoadConent(true)
        dispatch({ type: "SET_MESSAGE", payload: data.message });
    }

    async function setTodoTitle({ item, title }) {
        const todoid = item._id;

        if (!todoid) return;
        await requestApi("/api/todo/update-title", "PUT", { todoid, title });

        setLoadConent(true)
    }

    async function setTodoDescription({ item, description }) {
        const todoid = item._id;

        if (!todoid) return;

        await requestApi("/api/todo/update-description", "PUT", { todoid, description });
        setLoadConent(true)
    }

    async function setTodoPin({ item }) {
        const todoid = item._id;
        await requestApi("/api/todo/pin", "PUT", { todoid, pinned: !item.isPinned });
        setLoadConent(true)
    }

    async function setTodoColor({ item, colorHex }) {
        const todoid = item._id;

        await requestApi("/api/todo/set-color", "PUT", { todoid, color: colorHex });
        setLoadConent(true)
    }

    async function setTodoCompleted({ item }) {
        const todoid = item._id;
        await requestApi("/api/todo/set-completed", "PUT", { todoid, completed: !item.isCompleted });
        setLoadConent(true)
    }


    async function setRestoreTodo({ item }) {
        const todoid = item._id;
        const { data } = await requestApi("/api/todo/restore-todo", "PUT", { todoid });
        setLoadConent(true)
        dispatch({ type: "SET_MESSAGE", payload: data.message });
    }

    async function setTodoDeleteForever({ item }) {
        const todoid = item._id;
        const { data } = await requestApi("/api/todo/delete-forever", "DELETE", { todoid });
        setLoadConent(true)
        dispatch({ type: "SET_MESSAGE", payload: data.message });
    }


    return { setLoadConent, setTodoCompleted, setRestoreTodo, setTodoColor, setTodoPin, setTodoDescription, setTodoTitle, setTodoDelete, setTodoDeleteForever };
}