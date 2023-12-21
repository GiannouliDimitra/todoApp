import AddTodo from "./components/AddForm";
import TodoList from "./components/TodoList";
import DateDisplay from "./components/DateDisplay";
import { useEffect, useState } from "react";
import axios from "axios";
import ("./App.css");

function App() {
  const [todo, setTodo] = useState({
    text: "",
    status: "pending",
    isChecked: false,
    isImportant:"notImportant",
  });
  const [todos, setTodos] = useState([]);

  // get
  function getAllTodos() {
  try {
    axios
    .get("https://todoapp-cgvj.onrender.com/todos")
    .then ((res) => {
      setTodos(res.data);
      console.log("ALL" , res.data);
    })
    .catch((err) => console.log(err))
  } catch (error) {
    console.log(error)
  }  
  };

  // Render all the tasks on the screen once you open the app
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="Main_Container">
       <div className="App">
      <h1>Todo App</h1>
      <DateDisplay/>
      <AddTodo getAllTodos={getAllTodos} todo={todo} setTodo={setTodo} />
      <TodoList todos={todos} setTodos = {setTodos} getAllTodos={getAllTodos} todo={todo} setTodo={setTodo}/>
    </div>
    </div>
   
  );
}

export default App;
