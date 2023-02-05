const express = require("express");
const app = express();
const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

// EXPRESS MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));