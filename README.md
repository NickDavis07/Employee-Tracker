# Employee-Tracker

## Description
This is a command-line application to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL. The application is written in TypeScript.

## Demo

Watch a video demo of the Employee Tracker application in action:

[Watch the demo video](https://youtu.be/fsNTghO4SqQ)

## Features
- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles
- Interactive command-line interface

## Technologies Used
- Node.js
- TypeScript
- Inquirer
- PostgreSQL
- pg (node-postgres)
- Console.table

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.
4. Set up your PostgreSQL database using the provided `schema.sql` and `seeds.sql` files.
5. Create a `.env` file in the root directory with your PostgreSQL database credentials:

```plaintext
DB_USER=your_postgres_user
DB_HOST=localhost
DB_DATABASE=employee_tracker_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

## Usage
1. Navigate to the `db` directory: `cd db`
2. Run the `schema.sql` script to create the database and tables: `psql -U postgres -f schema.sql`
3. Run the `seeds.sql` script to populate the database with initial data: `psql -U postgres -d employee_tracker_db -f seeds.sql`
4. Navigate back to the project root directory: `cd ..`
5. Compile the TypeScript code to JavaScript: `npm run build`
6. Start the application: `npm start`
7. Follow the prompts to view, add, update, or delete employees, roles, and departments.

## Scripts
- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm start`: Runs the compiled JavaScript code.

## PostgreSQL Client Configuration
The PostgreSQL client configuration is set up to use environment variables from the `.env` file:

```typescript
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});
```

## .gitignore
Ensure you have a `.gitignore` file to exclude `node_modules`, `dist`, and `.env` files from version control:

```plaintext
node_modules/
dist/
.env
```
