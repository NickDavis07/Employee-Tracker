SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees AS manager ON employees.manager_id = manager.id
ORDER BY employees.id;
