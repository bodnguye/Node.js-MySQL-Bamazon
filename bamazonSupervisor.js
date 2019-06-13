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
  password: "Passw0rd",
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

  /********************************/
 /* viewDepartmentSales Function */
/********************************/
function viewDepartmentSales() {
    let query = "SELECT department_id, d.department_name, over_head_cost,"
		+ " SUM(product_sales) AS product_sales," 
		+ " SUM(product_sales) - over_head_cost AS total_profit ";
	query += "FROM departments d INNER JOIN products p ";
	query += "ON d.department_name = p.department_name ";
	query += "GROUP BY department_id ";

    connection.query(query, function(err, res) {
        if (err) throw err;

        let table = new Table({
            head: ['Department ID', 'Department', 'Over Head Cost', 'Product Sales', 'Total Profit'],
            colWidths: [15, 16, 16, 16, 16],
        })

        for (let i = 0; i < res.length; i++) {
            table.push([res[i].department_id, res[i].department_name, "$" + res[i].over_head_cost, "$" + res[i].product_sales, "$" + res[i].total_profit]);
          }
        console.log(`\n${table.toString()}\n\n`);
        })
        mainMenuPrompt();
};

  /********************************/
 /* createNewDepartment Function */
/********************************/
function createNewDepartment() {
      inquirer
        .prompt([
              {
                name: "department",
                type: "input",
                message: "Department Name: ",
              },
              {
                name: "overheadcost",
                type: "input",
                message: "Over Head Cost: ",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                    return false;
                  }
              }
          ])
          .then(function(answer) {
            console.log("Inserting a new department...\n");
            let query = connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.department,
                over_head_cost: answer.overheadcost
            },
            function(err, res) {
                if (err) throw err;
                    console.log(res.affectedRows + " department inserted!\n");
                    }
                );
            // logs the actual query being run
            console.log(query.sql);
            mainMenuPrompt();
            });
}

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