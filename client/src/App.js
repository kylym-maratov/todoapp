import React, { useEffect } from "react";
//
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from "./utils/theme.util";
import { ThemeProvider } from '@mui/material/styles';
import { AppContext, store, reducer } from "./store";
import { BrowserRouter } from "react-router-dom";
import UseRoutes from "./routes/use.routes";
import { SpeedDialComponent } from "./components/SpeeDial";
import { AlertComponent } from "./components/Alert";
import { Menu } from "./components/Menu";
import { Container } from "@mui/system";

function App() {
  const [state, dispatch] = React.useReducer(reducer, store);
  const { isDarkTheme, accessToken } = state;
  const routes = UseRoutes(!!accessToken);

  return (
    <Container>
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <CssBaseline />
          <BrowserRouter>
            {routes}
            <Menu />
          </BrowserRouter>
          <AlertComponent />
          {!!accessToken && <SpeedDialComponent />}
        </ThemeProvider>
      </AppContext.Provider>
    </Container>
  );
}

export default App;
