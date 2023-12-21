const express = require ("express");
const mongoose = require ("mongoose");
const Todo = require ("../models/todoModel");

//get todos
const findTodos = async (req,res) => {
    try {
        const allTodos = await Todo.find();
        res.status(200).send(allTodos);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
};

//post todo
const addTodo = async (req,res) => {
    try {
        const newTodo = req.body;
        const createdTodo = await Todo.create(newTodo);
        res.status(200).send(createdTodo);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error. We failed to create a new todo." });
    }
};

//put todo
const updateTodo = async (req, res) => {
    try {
        let clientValue = req.body;
        let id = req.params.id;
        await Todo.updateOne ({ _id: id }, clientValue);
        res.status(200).send ({msg: "The todo  task is updated successfully!"});
    } catch (error) {
        console.log (error);
        res.status(500).send({ msg: "Sorry, we failed to update your todo" });
    }
};

//delete todo
const deleteTodo = async (req,res) => {
    try {
        await Todo.deleteOne({_id: req.params.id });
        res.status(200).send ({msg: "The todo task is deleted successfully!"});
    } catch (error) {
        console.log (error);
        res.status(500).send({ msg: "Failed to delete the todo..We are so sorry" }); 
    }
};

module.exports = { findTodos, addTodo, updateTodo, deleteTodo }
