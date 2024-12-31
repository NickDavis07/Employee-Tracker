# Employee-Tracker

## Description
This is a command-line application to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

## Features
- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles
- Interactive command-line interface

## Technologies Used
- Node.js
- Inquirer
- PostgreSQL
- pg (node-postgres)
- Console.table

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.
4. Set up your PostgreSQL database using the provided `schema.sql` and `seeds.sql` files.
5. Update the PostgreSQL client configuration in `src/index.js` with your database credentials.

## Usage
1. Navigate to the `db` directory: `cd db`
2. Run the `schema.sql` script to create the database and tables: `psql -U postgres -f schema.sql`
3. Run the seeds.sql script to populate the database with initial data: `psql -U postgres -d employee_tracker_db -f seeds.sql`
4. Navigate to the src directory: `cd ../src`
5. Run node index.js to start the application.
6. Follow the prompts to view, add, update, or delete employees, roles, and departments.