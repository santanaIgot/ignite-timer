import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default"; // CORRETO!
import { GlobalStyle } from "./styles/global";

import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { Home } from "./Home";


export function App() {
  return (
    // <BrowserRouter>
    //   <ThemeProvider theme={defaultTheme}>
    //     <Router />
    //     <GlobalStyle />
    //   </ThemeProvider>
    // </BrowserRouter>

    <Home/>
  );
}
