import { createBrowserRouter } from "react-router-dom";
import { Todos } from "./pages/todos";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Todos />
    }
])