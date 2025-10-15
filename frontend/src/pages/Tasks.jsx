import Header from "../components/Header.jsx";
import Tasks from "../components/Tasks.jsx";
import TasksContextProvider from "../store/tasks-context.jsx";

export default function TasksPage() {
  return (
    <TasksContextProvider>
      <Header />
      <main>
        <Tasks />
      </main>
    </TasksContextProvider>
  );
}
