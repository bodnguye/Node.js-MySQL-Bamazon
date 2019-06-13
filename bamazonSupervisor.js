// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
const clear = require('clear');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  // username
  user: "root",

  // password
  // password: "Passw0rd",
  password: "Dai916Tran!",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the runCustomerView function after the connection
  runSupervisorView();
});

  /******************************/
 /* runSupervisorView Function */
/******************************/
function runSupervisorView() {
clear();
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome Supervisor, what would you like to do?",
      choices: [
        "View Product Sales by Department",
        "Create New Department",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Product Sales by Department":
        viewDepartmentSales();
        break;

      case "Create New Department":
        createNewDepartment();
        break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

function viewDepartmentSales() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;

        let table = new Table({
            head: ['Department ID', 'Department', 'Over Head Cost'],
            colWidths: [15, 16, 16],
        })

        for (let i = 0; i < res.length; i++) {
            table.push([res[i].department_id, res[i].department_name, "$" + res[i].over_head_cost]);
          }
        console.log(`\n${table.toString()}\n\n`);
        })
        mainMenuPrompt();
};

  /***************************/
 /* mainMenuPrompt Function */
/***************************/
function mainMenuPrompt() {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "Main menu or Exit?",
      choices: ["Main Menu", "Exit"]
      })
      .then(function(answer) {
      // based on their answer, either call the runManagerView() or connection.end()
        if (answer.mainMenu === "Main Menu") {
          runSupervisorView();
        }
        else {
          connection.end();
        }
        });
};