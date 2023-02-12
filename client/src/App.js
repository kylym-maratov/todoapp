import React from "react";
//
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from "./utils/theme.mode";
import { ThemeProvider } from '@mui/material/styles';
import { AppContext, initialState, reducer } from "./store";
import { BrowserRouter } from "react-router-dom";
import UseRoutes from "./routes/use.routes";
import { SpeedDialComponent } from "./components/SpeeDial";
import { AlertComponent } from "./components/Alert";


function App() {
  const routes = UseRoutes();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { isDarkTheme } = state;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </ThemeProvider>
      <AlertComponent />
      <SpeedDialComponent />
    </AppContext.Provider>
  );
}

export default App;
