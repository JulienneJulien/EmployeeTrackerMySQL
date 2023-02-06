USE Business_db;

INSERT INTO department (name)
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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('ANNA', 'APPLE', 5, 9),
        ('BETTY', 'BERRY', 2, 9),
        ('CAROL', 'CHERRIES', 5,9),
        ('DAVID', 'DATES', 4, 9),
        ('EVAN', 'EGGPLANT', 4,9),
        ('FRANK', 'FRIES', 6, 9),
        ('GREG', 'GUAVA', 7, 8),
        ('HENRY', 'HAZELNUTS', 1, 2),
        ('ISAAC', 'ICECREAM', 8, NULL),
