-- DATABASE
DROP DATABASE IF EXISTS bus_EE_Tracker_db;
CREATE DATABASE bus_EE_Tracker_db;
USE bus_EE_Tracker_db;
-- DEPARTMENT 
CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
-- ROLE 
CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10.2),
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
-- EMPLOYEE 
CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT, 
    FOREIGN KEY (manager_id) REFERENCES employees (id),
    PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES  ('Kitchen Staff'),
        ('Floor Staff'),
        ('Bar Staff'),
        ('Delivery Staff'),
        ('Managerial Staff'),

INSERT INTO role (title, salary, department_id)
VALUES  ('Dishwasher', 20000, 1),
        ('Head Chef', 59000, 1),
        ('Cashier', 35000, 5),
        ('Waiter', 29000, 2),
        ('Waitress', 29000, 2),
        ('Bartender', 32000, 3),
        ('Delivery Driver', 25000, 4),
        ('Restaurant Manager', 65000, 5),
 
        
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('ANNA', 'APPLE', 5, 9),
        ('BETTY', 'BERRY', 2, 9),
        ('CAROL', 'CHERRIES', 5,9),
        ('DAVID', 'DATES', 4, 9),
        ('EVAN', 'EGGPLANT', 4,9),
        ('FRANK', 'FRIES', 6, 9),
        ('GREG', 'GUAVA', 7, 2),
        ('HENRY', 'HAZELNUTS', 1, 2),
        ('ISAAC', 'ICECREAM', 8, NULL),



