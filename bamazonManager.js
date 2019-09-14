// import npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');

// setup connection
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showTable();
  });

//   creation function to print table of product data

function showTable() {
    // select * from products will select everything in the table products
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
}

// Once the table has loaded prompt the user to select what product they would like to purchase and how many units they want to purchase
function promptUser(){
  inquirer.prompt ([
          {
              type: 'list',
              name: 'managerOptions',
              message: 'Welcome to the Bamazon store! Use the arrows on your keyboard to select your desired action',
              choices: [
                'View all products', 
                'View low invetory products', 
                'Add more inventory to a product', 
                'Add a new product']
          }
      ]).then(function(answer) {
          switch (answer.managerOptions) {
          // if user chooses to view all products run view table function
            case 'View all products': 
                showTable();
                break;
            // if user chooses to view low invetory items run function
            case 'View low invetory products':
                viewLowInventory();
                break;
            // if user chooses to add more invetory to a product run function
            case 'Add more inventory to a product':
                // addInventory();
                break;
            // if user chooses to add a new product run function
            case 'Add more inventory to a product':
                // addNewProduct();
                break;
            case 'exit':
                connection.end();
                break;
          }
      });
}

// create a function that displays all products with a stock_quanity less than or equal to 5
function viewLowInventory() {
    // read quantity value from database
    connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function(err, res) { 
        if (err) throw err;
        console.table(res)
    })
}
