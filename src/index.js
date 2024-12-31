// index.js
const inquirer = require('inquirer');
const { Client } = require('pg');
const { table } = require('console');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'your_database',
  password: 'root',
  port: 5432,
});

client.connect();

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View all departments':
      viewAllDepartments();
      break;
    case 'View all roles':
      viewAllRoles();
      break;
    case 'View all employees':
      viewAllEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    case 'Exit':
      client.end();
      process.exit();
  }
};

const viewAllDepartments = async () => {
  const res = await client.query('SELECT * FROM departments');
  console.table(res.rows);
  mainMenu();
};

const viewAllRoles = async () => {
  const res = await client.query('SELECT * FROM roles');
  console.table(res.rows);
  mainMenu();
};

const viewAllEmployees = async () => {
  const res = await client.query('SELECT * FROM employees');
  console.table(res.rows);
  mainMenu();
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
  await client.query('INSERT INTO departments (name) VALUES ($1)', [name]);
  console.log('Department added!');
  mainMenu();
};

const addRole = async () => {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the name of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the role:',
    },
  ]);
  await client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log('Role added!');
  mainMenu();
};

const addEmployee = async () => {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for the employee:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee:',
    },
  ]);
  await client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  console.log('Employee added!');
  mainMenu();
};

const updateEmployeeRole = async () => {
  const { employee_id, new_role_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee to update:',
    },
    {
      type: 'input',
      name: 'new_role_id',
      message: 'Enter the new role ID for the employee:',
    },
  ]);
  await client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
  console.log('Employee role updated!');
  mainMenu();
};

mainMenu();