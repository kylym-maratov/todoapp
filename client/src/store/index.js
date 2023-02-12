import React from "react";


export const initialState = {
    isDarkTheme: false,
    alert: {
        error: "",
        warning: "",
        info: "",
        success: ""
    }
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return {
                ...state,
                isDarkTheme: action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export const AppContext = React.createContext();