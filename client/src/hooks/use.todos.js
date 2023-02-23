import { useCallback, useContext } from "react";
import { useAxios } from "../api/api";
import { AppContext } from "../store";


export const useTodos = () => {
    const { dispatch } = useContext(AppContext);
    const { requestApi } = useAxios();

    const fetchTodos = useCallback(async () => {
        const { data } = await requestApi("/api/todo/todos");

    }, [])

    async function createTodo(values) {
        const { data } = await requestApi("/api/todo/create", "POST", { ...values });
        fetchTodos()
        return data;
    }

    async function deleteTodo(values) {
        const { data } = await requestApi("/api/todo/delete", "DELETE", { ...values });
        fetchTodos()
        return data;

    }

    async function updateTodoTitle(values) {
        const { data } = await requestApi("/api/todo/update-title", "PUT", { ...values });
        return data;
    }


    return { fetchTodos, createTodo, deleteTodo, updateTodoTitle }
}