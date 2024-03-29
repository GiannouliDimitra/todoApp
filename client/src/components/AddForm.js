// AddTodo component
import axios from "axios";
import Swal from 'sweetalert2';
import "./AddForm.css"

function AddTodo({ getAllTodos , todo , setTodo, todos, setTodos }) {

  // Input Handler
  function handleInputChange(e) {
    setTodo({ ...todo, text: e.target.value });
  };
  // Add task
  const addNewTodo = () => {
    console.log (todo.text)
    if (todo.text.length<2) {
      Swal.fire("The field is empty.Please insert a task")
    }
    else {
      try {
        axios
        .post("https://todoapp-cgvj.onrender.com/todo/create", todo)
        .then((res) => Swal.fire("The task " + res.data.text + " is added"))
        .then(() => getAllTodos())
        .catch((error) => console.log (error));
        } catch (error) {
          console.log(error)
        }
    }
    
  };

  return (
    <div className ="inputField">
      <input
        type="text"
        placeholder="Add a task..."
        onChange={handleInputChange}
        value={todo.text}
      />
      <button className="addBut"onClick={addNewTodo}>
      <i className="material-icons addIcon">add_box</i>
      </button>
    </div>
  );
}

export default AddTodo;
