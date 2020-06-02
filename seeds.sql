USE company_db;

INSERT INTO
    employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Joan", "Smith", 3, null),
    ("Tony", "Something", 2, 4),
    ("Joe", "Johnson", 8, null),
    ("Lisa", "Madsen", 10, null),
    ("Mark", "Mann", 5, 1),
    ("Guy", "Park", 7, 3),
    ("Rodney", "Anderson", 6, 4),
    ("Tina", "Jones", 9, 9),
    ("Peter", "Paulson", 1, null),
    ("Nic", "Chung", 4, 9);

INSERT INTO
    company_role (title, salary, department_id)
VALUES
    ("Client Manager", 95000, 2),
    ("Intern", 35000, 3),
    ("HR Director", 80000, 5),
    ("Marketing Specialist", 60000, 4),
    ("HR Assistant", 40000, 5),
    ("Software Engineer", 85000, 3),
    ("Junior Accountant", 52000, 1),
    ("Accounting Director", 110000, 1),
    ("Sales Associate", 60000, 2),
    ("Lead Developer", 150000, 3);

INSERT INTO
    department (dep_name)
VALUES
    ("Accounting"),
    ("Sales"),
    ("Product Dev"),
    ("Marketing"),
    ("Human Resources");

SELECT
    *
FROM
    employees;

SELECT
    *
FROM
    company_role;

SELECT
    *
FROM
    department;