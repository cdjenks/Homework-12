USE company_db;

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Smith", 3, null),
    ("Tonya", "Something", 2, 4),
    ("Joe", "Jones", 2, 4),
    ("Peter", "Paulson", 1, null);

INSERT INTO company_role
    (title, salary, department_id)
VALUES
    ("Accounts Manager", 95000, 1),
    ("Intern", 45000, 2),
    ("Software Engineer", 70000, 3);

INSERT INTO department
    (dep_name)
VALUES
    ("Accounting"),
    ("Sales"),
    ("Product Dev"),
    ("Human Resources")

SELECT *
FROM employees;
SELECT *
FROM company_role;
SELECT *
FROM department;
