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
  // run the function after the connection
  runManagerView();
});

  /****************************/
 /* runManagerView Function */
/**************************/
function runManagerView() {
clear();
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome Manager, what would you like to do?",
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

  /************************/
 /* viewProduct Function */
/************************/
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
function viewProduct() {
    connection.query("SELECT * FROM products", function(err, inventory) {
        if (err) throw err;

        let table = new Table({
            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Quantity'],
            colWidths: [10, 68, 16, 10, 16],
        })

        for (let i = 0; i < inventory.length; i++) {
            table.push([inventory[i].item_id, inventory[i].product_name, inventory[i].department_name, "$" + inventory[i].price, inventory[i].stock_quantity]);
          }
        console.log(`\n${table.toString()}\n\n`);
        })
        mainMenuPrompt();
};

  /*************************/
 /* lowInventory Function */
/*************************/
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, inventory) {
        if (err) throw err;

        let table = new Table({
            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Quantity'],
            colWidths: [10, 68, 16, 10, 16],
        })

        for (let i = 0; i < inventory.length; i++) {
            table.push([inventory[i].item_id, inventory[i].product_name, inventory[i].department_name, "$" + inventory[i].price, inventory[i].stock_quantity]);
          }
        console.log(`\n${table.toString()}\n\n`);
        })
        mainMenuPrompt();
}

  /*************************/
 /* addInventory Function */
/*************************/
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    connection.query("SELECT * FROM products", function(err, inventory) {
        if (err) throw err;

        let table = new Table({
            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Quantity'],
            colWidths: [10, 68, 16, 10, 16],
        })

        for (let i = 0; i < inventory.length; i++) {
            table.push([inventory[i].item_id, inventory[i].product_name, inventory[i].department_name, "$" + inventory[i].price, inventory[i].stock_quantity]);
          }
        console.log(`\n${table.toString()}\n\n`);
        })

    inquirer
        .prompt([
              {
                name: "inventory",
                type: "input",
                message: "Which item would you like to add more inventory? (Enter the item_id)",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                    return false;
                  }
              },
              {
              name: "stock",
              type: "input",
              message: "What is the quantity would you like to add?",
              validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                    return false;
                  }
              }
          ])
          .then(function(answer) {
            let query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.inventory }, function(err, selectedItem) {
              if (err) throw err;
              connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: parseInt(selectedItem[0].stock_quantity) + parseInt(answer.stock)
                    },
                    {
                      item_id: answer.inventory
                    }
                  ],

                function(error) {
                  if (error) throw err;
                  console.log(`Item ID ${selectedItem[0].item_id} has been successfully updated`);
                  mainMenuPrompt();
                }
                );
            })
          })
};

  /***********************/
 /* newProduct Function */
/***********************/
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function newProduct() {
    inquirer
        .prompt([
              {
                name: "product",
                type: "input",
                message: "Product Name: ",
              },
              {
                name: "department",
                type: "input",
                message: "Department: ",
              },
              {
                name: "price",
                type: "input",
                message: "Price: ",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                    return false;
                  }
              },
              {
                name: "stock",
                type: "input",
                message: "Stock Quantity: ",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                    return false;
                  }
              }
          ])
          .then(function(answer) {
            console.log("Inserting a new product...\n");
            let query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.stock
            },
            function(err, res) {
                if (err) throw err;
                    console.log(res.affectedRows + " product inserted!\n");
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
          runManagerView();
        }
        else {
          connection.end();
        }
        });
};