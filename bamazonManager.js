// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
const clear = require('clear');
clear();

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  // username
  user: "root",

  // password
  password: "Dai916Tran!",
//   password: "Passw0rd",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection
  runManagerView();
});

function runManagerView() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProduct();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        newProduct();
        break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

function viewProduct() {
    connection.query("SELECT * FROM products", function(err, inventory) {
        if (err) throw err;
        for (let i = 0; i < inventory.length; i++) {
            console.log(`${inventory[i].item_id} | ${inventory[i].product_name} | ${inventory[i].department_name} | $${inventory[i].price} | ${inventory[i].stock_quantity}`);
            console.log("-----------------------------------");
          }
    })
};    