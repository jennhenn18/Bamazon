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
    promptUser();
  });

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
                'Add a new product',
                'Remove a product']
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
                addInventory();
                break;
            // if user chooses to add a new product run function
            case 'Add a new product':
                addNewProduct();
                break;
            // if user chooses to remove a product run function
            case 'Remove a product':
                removeProduct();
                break;
            case 'exit':
                connection.end();
                break;
          }
      });
}

// create a function to print table of product data

function showTable() {
    // select * from products will select everything in the table products
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
}

// create a function that displays all products with a stock_quanity less than or equal to 5
function viewLowInventory() {
    // read quantity value from database
    connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function(err, res) { 
        if (err) throw err;
        console.table(res)
    })
    inquirer.prompt([
        {
            type: 'addInventory',
            name: 'addInventory',
            message: 'Would you like to add inventory to one of these items? (Y or N)' 
        }
    ]).then(function(answer) {
        switch (answer.addInventory) {
            // if Y then run add Invetory function
            case 'Y':
                addInventory();
                break;
            // if N then exit
            case 'N':
                connection.end()
                break;
        }
    })
}

// create a function that allows the manager to add invetory to a product
function addInventory() {
    // show the table again to the manager
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        selectProductToAddInv();
    })
    function selectProductToAddInv() {
        inquirer.prompt ([
            {
                type: 'input',
                name: 'inventoryProduct',
                message: 'Entering the product name in the table, which product would you like to add inventory to?'
            },
            {
                type: 'input',
                name: 'numItemsToAdd',
                message: 'How much inventory would you like to add?'
            }
        ]).then(function(answer) {
            const { inventoryProduct, numItemsToAdd } = answer;

            // run a query on that reads the amount stock currently for the product the user entered
            connection.query('SELECT DISTINCT stock_quantity FROM products WHERE product_name = ?', [inventoryProduct], function(err, res) { if (err) throw err;

            // store the stock returned
            var currentStock = res[0].stock_quantity;

            // make units to add a number
            var stockToAdd = Number(numItemsToAdd);

            // using the input they gave, add that number to the current stock
            var newStock = currentStock + stockToAdd;
            console.log('new stock: ' + newStock);

            // put that new stock amount into the table
            var sql = 'UPDATE products SET ? WHERE ?';
                // update table with the new stock
                connection.query(sql, [
                    {
                        stock_quantity: newStock
                    },
                    {
                        product_name: inventoryProduct
                    }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        // show updated message
                        console.log(res.affectedRows + " products updated!\n")
                        // show new table
                        showTable();
                    })
                })
        })
    }
}

// create a function so the manager can add a new product to the table
function addNewProduct() {
    // user needs to input a product name, department name, price, and stock quantity
    inquirer.prompt ([
        {
            type: 'input',
            name: 'newProductName',
            message: 'Enter the product name'
        },
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'Enter the name of the department where the product should be stored'
        },
        {
            type: 'input',
            name: 'newPrice',
            message: 'Enter the price of the product'
        },
        {
            type: 'input',
            name: 'newStockQuantity',
            message: 'Enter the starting stock quantity for the product'
        }
    ]).then(function(answer){
        // update table with the new product information
        console.log(answer.newProductName);
        console.log(answer.newDepartmentName);
        

        // make price a INT to store into the SQL table
        var price = Number(answer.newPrice);
        console.log(price);
        

        // make the stock quantity a INT to store into the SQL table
        var stockQuantity = Number(answer.newStockQuantity);
        console.log(stockQuantity);

        // create sql query
        var sql = 'INSERT INTO products SET ?';
        // add new product to the table
        connection.query(sql,
            {
                product_name: answer.newProductName,
                department_name: answer.newDepartmentName,
                price: price,
                stock_quantity: stockQuantity
            },
            function(err, res) {
                if (err) throw err;
                // show updated message
                console.log(res.affectedRows + " new product added!\n")
                // show new table
                showTable();
            });
    })
}

// create a function to delete a product from the table
function removeProduct() {
    // run to prompt to identify what product to delete
    inquirer.prompt([
        {
            type: 'input',
            name: 'removeProduct',
            message: 'Enter name of product to remove from stock'
        }
    ]).then(function(answer){
        // run query to remove product identified
        connection.query('DELETE FROM products WHERE ?',
        {
            product_name: answer.removeProduct
        },
        function(err, res) {
            if (err) throw err;
            // show removed confirmation message
            console.log(res.affectedRows + 'products deleted!\n');
            // display updated table
            showTable();
        })   
    })
}