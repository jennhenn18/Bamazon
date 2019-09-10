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
              type: 'input',
              name: 'productName',
              message: 'What product would you like to buy?'
          },
          {
              type: 'input',
              name: 'unitsToPurchase',
              message: 'How many units would you like to purchase?'
          }
      ]).then(function(answer) {
          // run update quantity function
          updateQuantity(answer);
      });
}

// create function to update the Quantity

function updateQuantity(answer) {
      // descontruct variable
      const { productName, unitsToPurchase } = answer;
      
      // read quantity value from database
      connection.query('SELECT DISTINCT stock_quantity FROM products WHERE product_name = ?', [productName], function(err, res) { 
          if (err) throw err;

          // store the stock returned
          var stockReturned = res[0].stock_quantity;
          console.log('Stock Returned: ' + stockReturned)

          // make units to purchase a number
          var unitsToInt = Number(unitsToPurchase);

          // find the delta between the units wanted and the amount in stock
          var stockDelta = stockReturned - unitsToInt;
          console.log('Stock Delta: ' + stockDelta);

          // if the desired amount to purchase is not less than the amount in stock throw an error message
          if (unitsToPurchase > stockReturned) {
              console.log('Insufficient quantity!');
              return
          
          // if the desired amount to purchase is less than the amount in stock then continue with the purchase
          } else {
              // subtract the desired amount from the stock_quantity value

              // create sql query
              var sql = 'UPDATE products SET ? WHERE ?';
              // update table with the delta after the purchase
              connection.query(sql, [
                  {
                    stock_quantity: stockDelta
                  },
                  {
                      product_name: answer.productName
                  }
                  ],
                  function(err, res) {
                  if (err) throw err;
                  console.log(res.affectedRows + " products updated!\n");
                  // showTotalCost(answer);
                  })  
            }
        })
}

// create a function to show the total cost


