import { RouterProvider, createBrowserRouter } from "react-router-dom";

import TasksPage from "./pages/Tasks.jsx";

const router = createBrowserRouter([{ path: "/", element: <TasksPage /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
