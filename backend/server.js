const express = require ("express");
const app = express();
const cors = require("cors");
const connection = require ("./connection");
const port = 8000;

//middlware
app.use(express.json());
app.use(cors()); // everyone have access to pc

const todoModel = require ("./models/todoModel");
const todoRoutes = require("./Routers/todoRouter"); 


app.use ("/", todoRoutes);
app.listen (port, () => {
    console.log (`The server is working in port ${port}`)
});