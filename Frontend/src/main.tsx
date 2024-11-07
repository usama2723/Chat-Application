import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ChatProvider from "./Context/ChatProvider.js";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
    <ChatProvider>
      <App />
    </ChatProvider>
  </BrowserRouter>
  </ThemeProvider>
);
