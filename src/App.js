import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Task from "./Components/Task";
import Tasks from "./Components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const dataFromServer = await fetchTasks();
      setTasks(dataFromServer);
      console.log(dataFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();

    return data;
  };

  const addTask = async (title) => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      completed: false,
      userId: 1,
    };
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // const data = await res.json()
    setTasks((_tasks) => [todo, ..._tasks]);

    // console.log(data)
  };

  const deletTask = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = async (id, payload) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setTasks((_tasks) =>
      _tasks.map((task) => {
        if (task.id === id) {
          task = { ...task, ...payload };
        }
        return task;
      })
    );
  };

  return (
    <div className="container items-center mx-auto flex pb-8 pt-8 justify-center flex-col text-center w-1/2">
      <h1 className="text-black text-base">
        {" "}
        Plan your day, one task at a time.
      </h1>
      <div className="bg-sama mt-7">
        <Header addTask={addTask} />
        <Tasks>
          {tasks.map((task) => (
            <Task
              key={task.title}
              id={task.id}
              title={task.title}
              completed={task.completed}
              onDelete={deletTask}
              onUpdate={updateTask}
            />
          ))}
        </Tasks>
      </div>
    </div>
  );
}

export default App;
