INSERT INTO departments (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Human Resources'),
       ('Marketing'),
       ('Sales'),
       ('IT'),
       ('Customer Support'),
       ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 80000, 1),
       ('Accountant', 60000, 2),
       ('HR Manager', 75000, 3),
       ('Marketing Specialist', 50000, 4),
       ('Sales Representative', 45000, 5),
       ('IT Support Specialist', 55000, 6),
       ('Customer Support Representative', 40000, 7),
       ('Legal Advisor', 90000, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, 1),
       ('Emily', 'Jones', 3, NULL),
       ('Michael', 'Brown', 4, 3),
       ('Sarah', 'Davis', 5, 4),
       ('David', 'Wilson', 6, NULL),
       ('Laura', 'Taylor', 7, 6),
       ('James', 'Anderson', 8, NULL);