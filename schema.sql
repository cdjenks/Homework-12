DROP DATABASE IF EXISTS company_db;

CREATE database company_db;

USE company_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT NULL
);

CREATE TABLE company_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL (10),
    department_id INT
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dep_name VARCHAR (30),
    PRIMARY KEY (id)
)