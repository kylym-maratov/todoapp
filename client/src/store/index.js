import React from "react";
import { initialAppState } from "./app";
import { initialTodoState } from "./todos";
import { initialUserState } from "./user";

export const initialState = {
    ...initialAppState,
    ...initialUserState,
    ...initialTodoState
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_THEME":
            return {
                ...state,
                isDarkTheme: action.payload
            }
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        case "SET_USER_DATA":
            return {
                ...state,
                userData: action.payload
            }
        case "SET_ACCESS_TOKEN":
            return {
                ...state,
                accessToken: action.payload
            }
        case "SET_USER_THEME":
            return {
                ...state,
                userData: { ...state.userData, isDarkTheme: action.payload }
            }
        case "SET_OPEN_MENU":
            return {
                ...state,
                openMenu: action.payload
            }
        case "SET_TODOS":
            return {
                ...state,
                todos: action.payload
            }
        default:
            return state;
    }
}

export const AppContext = React.createContext();