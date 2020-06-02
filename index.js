const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "BenchWork",
  database: "company_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connection established");
  determineRequest();
});

function determineRequest() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View a department, role, or employee",
        "Add a department, role, or employee",
        "Update an employee's role",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View a department, role, or employee":
          viewCompanyData();
          break;

        case "Add a department, role, or employee":
          addCompanyData();
          break;

        case "Update an employee's role":
          updateEmployeeRole();
          break;
        case "Exit":
          console.log("Goodbye");
          connection.end();
          break;
      }
    });
}

function viewCompanyData() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What information would you like to view?",
      choices: [
        "View department data",
        "View company role data",
        "View employee data",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View department data":
          connection.query(`SELECT dep_name FROM department`, function (
            err,
            results
          ) {
            if (err) throw err;
            console.table(results);
            determineRequest();
          });
          break;

        case "View company role data":
          connection.query(
            `SELECT title, salary, dep_name FROM company_role INNER JOIN department ON company_role.department_id = department.id`,
            function (err, results) {
              if (err) throw err;
              console.table(results);
              determineRequest();
            }
          );
          break;

        case "View employee data":
          connection.query(
            `SELECT employees.id, first_name, last_name, title, dep_name, manager_id FROM employees INNER JOIN company_role ON employees.role_id = company_role.id INNER JOIN department ON company_role.department_id = department.id`,
            function (err, results) {
              if (err) throw err;
              console.table(results);
              determineRequest();
            }
          );
          break;
      }
    });
}

function addCompanyData() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Are adding a department, role, or employee?",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Department":
          addDepartment();
          break;

        case "Role":
          addRole();
          break;

        case "Employee":
          addEmployee();
          break;
      }
    });
}

// inquirer.prompt()  //get employee first + last
// connection.query // search table for employee
// if (employee) {
//  connection.query // get available roles
//  inquire.prompt
// }
//else no eployee found

function updateEmployeeRole() {
  connection.query(
    "SELECT employees.id, first_name, last_name, title, role_id FROM employees INNER JOIN company_role ON employees.role_id = company_role.id",
    function (err, results) {
      inquirer
        .prompt([
          {
            name: "selectedEmployee",
            type: "rawlist",
            choices: function () {
              for (var i = 0; i < results.length; i++) {
                let employeeName =
                  results[i].first_name + " " + results[i].last_name;
                choiceArray.push(employeeName);
              }
              return choiceArray;
            },
            message: "Select the employee you will be updating",
          },
          {
            name: "newRole",
            type: "rawlist",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                if (!choiceArray.includes(results[i].title)) {
                  choiceArray.push(results[i].title);
                }
              }
              return choiceArray;
            },
            message: "Select the new role of this employee",
          },
        ])
        .then(function (answers) {
          for (var i = 0; i < results.length; i++) {
            let combinedManagerName =
              results[i].first_name + " " + results[i].last_name;
            if (combinedManagerName === answers.manager) {
              selectedManagerId = results[i].id;
            }
            if (results[i].title === answers.title) {
              selectedRoleId = results[i].role_id;
            }
          }
        });
    }
  );
}

function addDepartment() {
  inquirer
    .prompt({
      name: "dep_name",
      type: "input",
      message: "What is the name of the department you are adding?",
    })
    .then(function (answers) {
      connection.query(
        `INSERT INTO department (dep_name) VALUES ("${answers.dep_name}")`,
        function (err, results) {
          if (err) throw err;
          console.log("Department added successfully");
          determineRequest();
        }
      );
    })
    .catch(function (e) {
      console.error(e);
    });
}

function addEmployee() {
  connection.query(
    "SELECT employees.id, first_name, last_name, title, role_id FROM employees INNER JOIN company_role ON employees.role_id = company_role.id",
    function (err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the first name of the employee you are adding?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the last name of the employee you are adding?",
          },
          {
            name: "title",
            type: "rawlist",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                if (!choiceArray.includes(results[i].title)) {
                  choiceArray.push(results[i].title);
                }
              }
              return choiceArray;
            },
            message: "Select the role of this employee",
          },
          {
            name: "manager",
            type: "rawlist",
            choices: function () {
              var choiceArray = ["None"];
              for (var i = 0; i < results.length; i++) {
                let managerName =
                  results[i].first_name + " " + results[i].last_name;
                choiceArray.push(managerName);
              }
              return choiceArray;
            },
            message: "Select the manager of this employee",
          },
        ])
        .then(function (answers) {
          if (answers.manager === "None") {
            selectedManagerId = null;
          }

          for (var i = 0; i < results.length; i++) {
            let combinedManagerName =
              results[i].first_name + " " + results[i].last_name;
            if (combinedManagerName === answers.manager) {
              selectedManagerId = results[i].id;
            }
            if (results[i].title === answers.title) {
              selectedRoleId = results[i].role_id;
            }
          }
          connection.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${selectedRoleId}, ${selectedManagerId})`,
            function (err, results) {
              if (err) throw err;
              console.log("Employee successfully added");
              determineRequest();
            }
          );
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  );
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the role you are adding?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for the role you are adding?",
        },
        {
          name: "dep_name",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].dep_name);
            }
            return choiceArray;
          },
          message: "Select the department the new role will be a part of",
        },
      ])
      .then(function (answers) {
        let selectedDepartmentId;
        for (var i = 0; i < results.length; i++) {
          if (results[i].dep_name === answers.dep_name) {
            selectedDepartmentId = results[i].id;
          }
        }
        connection.query(
          `INSERT INTO company_role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${selectedDepartmentId})`,
          function (err, results) {
            if (err) throw err;
            console.log("Role added successfully");
            determineRequest();
          }
        );
      })
      .catch(function (e) {
        console.error(e);
      });
  });
}
