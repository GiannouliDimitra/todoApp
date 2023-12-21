import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos, getAllTodos, todo, setTodo }) {
  return (
    <>
      <div>
        {/* Render the TodoItem component with todos and getAllTodos function */}
        <TodoItem todos={todos} setTodos = {setTodos} getAllTodos={getAllTodos} todo={todo} setTodo={setTodo} />
      </div>
    </>
  );
}

export default TodoList;
