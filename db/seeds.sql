INSERT INTO departments (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Human Resources'),
       ('Marketing'),
       ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 80000, 1),
       ('Accountant', 60000, 2),
       ('HR Manager', 75000, 3),
       ('Marketing Specialist', 50000, 4),
       ('Sales Representative', 45000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, 1),
       ('Emily', 'Jones', 3, NULL),
       ('Michael', 'Brown', 4, 3),
       ('Sarah', 'Davis', 5, 4);
       
