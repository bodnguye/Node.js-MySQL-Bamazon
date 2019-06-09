// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Dai916Tran!",
//   password: "Passw0rd",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the startDisplay function after the connection
  startBamazon();
});

function startBamazon() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price);
            console.log("-----------------------------------");
          };    
          inquirer
            .prompt([
              {
                name: "selectedProduct",
                type: "input",
                message: "Which item would you like to buy? (Enter the item_id)"
              },
              {
              name: "selectedQuantity",
              type: "input",
              message: "What is the quantity would you like to buy?"   
              }
          ])
          .then(function(answer) {
              console.log(length + answer);
          })
      });
}


