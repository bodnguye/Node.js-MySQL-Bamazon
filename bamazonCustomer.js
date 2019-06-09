// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
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
  // run the start function after the connection
  start();
});

function start() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, inventory) {
        if (err) throw err;
        for (let i = 0; i < inventory.length; i++) {
            console.log(inventory[i].item_id + " | " + inventory[i].product_name + " | " + "$" + inventory[i].price);
            console.log("-----------------------------------");
          };    
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
            let query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.selectedId }, function(err, selectedItem) {
              if (err) throw err;

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
                  shopAgainPrompt();
                }
                );
              }
              else {
                console.log("Sorry, Insufficient quantity!");
                shopAgainPrompt();
              }
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
      // based on their answer, either call the start() or connection.end()
        if (answer.shopAgain === "YES") {
          start();
        }
        else {
          connection.end();
        }
        });
};


