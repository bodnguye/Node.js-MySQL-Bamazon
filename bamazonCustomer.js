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
  runCustomerView();
});

function runCustomerView() {
  clear();
    connection.query("SELECT item_id, product_name, department_name, price FROM products", function(err, inventory) {
        if (err) throw err;

        let table = new Table({
            head: ['Item ID', 'Product', 'Department', 'Price'],
            colWidths: [10, 68, 16, 10],
            })

        for (let i = 0; i < inventory.length; i++) {
            table.push([inventory[i].item_id, inventory[i].product_name, inventory[i].department_name, "$" + inventory[i].price]);
          }
          console.log(`\n${table.toString()}\n\n`);   

          inquirer
            .prompt([
              {
                name: "selectedId",
                type: "input",
                message: "Which item would you like to buy? (Enter the item_id)",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                    return false;
                  }
              },
              {
              name: "selectedQuantity",
              type: "input",
              message: "What is the quantity would you like to buy?",
              validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                    return false;
                  }
              }
          ])
          .then(function(answer) {
            clear();
            let query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.selectedId }, function(err, selectedItem) {
              if (err) throw err;

              // Update the stock_quantity
              if (parseInt(selectedItem[0].stock_quantity) - parseInt(answer.selectedQuantity) >= 0) {
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: parseInt(selectedItem[0].stock_quantity) - parseInt(answer.selectedQuantity)
                    },
                    {
                      item_id: answer.selectedId
                    }
                  ],

                function(error) {
                  if (error) throw err;
                  console.log(`Your total will be $${parseInt(answer.selectedQuantity) * parseFloat(selectedItem[0].price).toFixed(2)}. \nThank you for shopping at Bamazon!`);
                  
                }
                );
              }
              else {
                console.log("Sorry, Insufficient quantity!");
                shopAgainPrompt();
              }

                // Update the product_sales
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      product_sales: parseInt(answer.selectedQuantity) * parseFloat(selectedItem[0].price).toFixed(2)
                    },
                    {
                      item_id: answer.selectedId
                    }
                  ],

                function(error) {
                  if (error) throw err;
                  console.log(`Your payment has been processed!`);
                  shopAgainPrompt();
                }
                );
                })
            });
      });
}

function shopAgainPrompt() {
  inquirer
    .prompt({
      name: "shopAgain",
      type: "list",
      message: "Would you like to shop for more?",
      choices: ["YES", "NO"]
      })
      .then(function(answer) {
      // based on their answer, either call the runCustomerView() or connection.end()
        if (answer.shopAgain === "YES") {
          runCustomerView();
        }
        else {
          connection.end();
        }
        });
};


