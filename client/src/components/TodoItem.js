import axios from "axios";
import Swal from 'sweetalert2';
import"./TodoItem.css";
import { useState } from "react";


function TodoItem({ getAllTodos, todos, setTodos, todo, setTodo }) {
//states
  const [isEdit, setIsEdit] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");
  const [todoId, setTodoId] = useState(null);

  //delete
  function deleteTodo(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText:"No",
    }).then((result) => {
      if (result.isConfirmed) { 
        try {
          axios.delete(`https://todoapp-cgvj.onrender.com/${id}`)
          .then(() => {
            getAllTodos();
          })
         
        } catch (error) {
          console.log("delete todo", error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonColor:"#3085d6",
        });
      }
    });
  };
//edit
  function handleUpdatedTask (e) {
     setUpdatedValue(e.target.value);
  };

  function updateTodo (id) {
    console.log(id)
    setIsEdit(true);
    setTodoId(id);
  };

  function saveChanges () {
    try{
      console.log("this is the id" , todoId, "and the value" , updatedValue)
   axios
        .put((`https://todoapp-cgvj.onrender.com/todo/${todoId}`), {text:updatedValue})
        .then((res) => console.log(res.data))
        .then (() => getAllTodos())
        .catch((error) => console.log (error));
        
    } catch (error) {
    console.log (error);
  }
    setIsEdit(false);
  };

  //toggle
  function toggleStatus(id) {
    try {
       todos.map(todo =>{
        if(id===todo._id){
         axios
         .put((`https://todoapp-cgvj.onrender.com/todo/${id}`),{
            status: todo.status ==="pending" ? "done" : "pending",
            isChecked: todo.isChecked === false ? true : false,
           })
        .then((res) => console.log(res.data))
        .then (() => getAllTodos())
        .catch((error) => console.log (error));
        }
        return todo;
        })
    } catch (error) {
    console.log (error);
  }
};

//makeImportant
function makeImportant(id) {
  console.log(id)
  try {
    todos.map(todo =>{
     if(id===todo._id){
      axios
      .put((`https://todoapp-cgvj.onrender.com/todo/${id}`),{
        isImportant: todo.isImportant ==="notImportant" ? "important" : "notImportant",
        })
     .then((res) => console.log(res.data))
     .then (() => getAllTodos())
     .catch((error) => console.log (error));
     }
     return todo;
     })
 } catch (error) {
 console.log (error);
  }
};

  return (

    <div>
      { !isEdit ?  (
      <div className ="mainContainer">
        {todos.map((todo) => (
        <div key={todo._id} className ="taskContainer">
          <div className = "textPlace"> 
            <input className ="checkInput" type="checkbox" checked = {todo.isChecked} onChange={() => toggleStatus(todo._id)} />
          <span className = {todo.status}>{todo.text}</span> 
          </div>
          <div className = "buttonPlace">
          <button className="deleteBut" onClick={() => deleteTodo(todo._id)}>
            <i className="material-icons">delete</i>
          </button>
          <button className = "editBut" onClick={() => updateTodo(todo._id)}>
            <i className="material-icons editBut">edit</i>
          </button>
          <button className = {todo.isImportant} onClick={() => makeImportant(todo._id)}>
            <i className="material-icons importantIcon">star_outline</i>
          </button>
          </div>
        </div>
        
      ))}
      </div> ) : (
      <div>
        <input
        type="text"
        placeholder="Edit the task..."
        onChange={(e) => handleUpdatedTask(e)}
        value={updatedValue}
      />
      <button className ="saveAdd"onClick={() => saveChanges()}>
        <i className="material-icons saveIcon">save</i>
      </button>
      <button onClick={() => setIsEdit (false)}>
        <i className="material-icons importantIcon">disabled_by_default</i>
        </button>
      </div>
    )}
    </div>
  );
}

export default TodoItem;


