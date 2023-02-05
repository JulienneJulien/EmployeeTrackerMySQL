const express = require("express");
const app = express();
const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 8000;
app.get("/", function (req, res) {
    res.send("HEY TESTING ROUTE");
});

app.listen(PORT, () => console.log(' Server Listening on port ' + PORT));
// EXPRESS MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));