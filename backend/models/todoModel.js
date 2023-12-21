const mongoose = require ("mongoose");

//schema
const todoSchema = new mongoose.Schema ({
    text: String,
    status: {type: String, default: "pending" },
    isChecked: {type: Boolean, default: false },
    isImportant: {type: String, default: "notImportant" },
});

//model 
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;