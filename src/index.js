import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Flowbite } from "flowbite-react";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import TodoList from "./pages/TodoList/TodoList";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <TodoList /> },
          {
            errorElement: <ErrorPage />,
            path: "todolist",
            element: <TodoList />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Flowbite>
    <RouterProvider router={router} />
  </Flowbite>
);
