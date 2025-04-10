import { Button } from "./components/button";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button color="primary" />
      <Button color="danger" />
      <Button color="success" />
      <Button />
    </ThemeProvider>
  );
}
