import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default"; // CORRETO!
import { GlobalStyle } from "./styles/global";

import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { createContext } from "react";
import { Cycle } from "./pages/Home";
import { CyclesContextProvider } from "./contexts/CyxlesContext";



export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider >
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}
