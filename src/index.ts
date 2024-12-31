// Import required modules
import * as inquirer from 'inquirer';
import { Client } from 'pg';

// Configure PostgreSQL client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_tracker_db',
  password: 'root',
  port: 5432,
});

// Connect to the PostgreSQL database
client.connect((err: Error | null) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// Main menu function to prompt user for action
const mainMenu = async (): Promise<void> => {
  console.log('Displaying main menu');
  const { action } = await inquirer.prompt<{ action: string }>([
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

  // Handle user selection
  switch (action) {
    case 'View all departments':
      console.log('Selected: View all departments');
      await viewAllDepartments();
      break;
    case 'View all roles':
      console.log('Selected: View all roles');
      await viewAllRoles();
      break;
    case 'View all employees':
      console.log('Selected: View all employees');
      await viewAllEmployees();
      break;
    case 'Add a department':
      console.log('Selected: Add a department');
      await addDepartment();
      break;
    case 'Add a role':
      console.log('Selected: Add a role');
      await addRole();
      break;
    case 'Add an employee':
      console.log('Selected: Add an employee');
      await addEmployee();
      break;
    case 'Update an employee role':
      console.log('Selected: Update an employee role');
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Selected: Exit');
      client.end();
      process.exit();
      break;
    default:
      console.log('Invalid action');
      mainMenu();
  }
};

// Function to view all departments
const viewAllDepartments = async (): Promise<void> => {
  try {
    const res = await client.query('SELECT * FROM departments');
    console.table(res.rows);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
  }
  mainMenu();
};

// Function to view all roles
const viewAllRoles = async (): Promise<void> => {
  try {
    const res = await client.query('SELECT * FROM roles');
    console.table(res.rows);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
  }
  mainMenu();
};

// Function to view all employees
const viewAllEmployees = async (): Promise<void> => {
  try {
    const res = await client.query(`
      SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
      FROM employees
      LEFT JOIN roles ON employees.role_id = roles.id
      LEFT JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id
      ORDER BY employees.id;
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
  }
  mainMenu();
};

// Function to add a new department
const addDepartment = async (): Promise<void> => {
  const { name } = await inquirer.prompt<{ name: string }>([
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

// Function to add a new role
const addRole = async (): Promise<void> => {
  const { title, salary, department_id } = await inquirer.prompt<{ title: string, salary: number, department_id: number }>([
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

// Function to add a new employee
const addEmployee = async (): Promise<void> => {
  try {
    // Fetch existing roles and employees
    const roles = await client.query('SELECT id, title FROM roles');
    const employees = await client.query('SELECT id, first_name, last_name FROM employees');

    // Prompt for employee details
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt<{ first_name: string, last_name: string, role_id: number, manager_id: number | null }>([
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
        type: 'list',
        name: 'role_id',
        message: 'Select the role for the employee:',
        choices: roles.rows.map((role: { id: number; title: string }) => ({ name: role.title, value: role.id })),
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the manager for the employee:',
        choices: [{ name: 'None', value: null as number | null }].concat(employees.rows.map((emp: { id: number; first_name: string; last_name: string }) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))),
      },
    ]);

    // Insert the new employee
    await client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log('Employee added!');
  } catch (err) {
    console.error('Error adding employee:', (err as Error).stack);
  }
  mainMenu();
};

// Function to update an employee's role
const updateEmployeeRole = async (): Promise<void> => {
  const { employee_id, new_role_id } = await inquirer.prompt<{ employee_id: number, new_role_id: number }>([
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
  try {
    await client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
    console.log('Employee role updated!');
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
  }
  mainMenu();
};

// Start the application by displaying the main menu
mainMenu().catch(err => console.error('Error in mainMenu:', (err as Error).stack));