const express = require ("express");
const router = express.Router();
const { 
    findTodos, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
} = require ("../controllers/todoController");

//get
router.get("/todos", findTodos);

//post
router.post("/todo/create", addTodo);


//put
router.put ("/todo/:id", updateTodo);

//delete
router.delete("/todo/:id", deleteTodo);

module.exports = router;