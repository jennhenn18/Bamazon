# Bamazon

Welcome to the Bamazon store! This application offers two workflow scenarios: 1) customers or 2) managers. See the getting started steps below for the different scenarios.

## Getting started for customers

1) Download the GitHub repo to your computer
2) In your terminal navigate to where you stored the repo and open the folder and open your terminal from the bamazonCustomer.js file
3) Ensure node and npm is installed on your computer. If you do not see a package.json folder run npm init in your command line
4) Install 2 npm packages: a) mysql and b) inquirer
5) Next you need to create the database. Run -mysql -uroot -p in your CLI
6) If successful run source bamazon.sql - this will create the database. type 'exit' in the command line to return to the folder
7) Run node bamazonCustomer.js
8) Follow the prompts to interact with the table data

### Customer scenario demo
Download this [video](https://github.com/jennhenn18/Bamazon/blob/master/assets/customerworkflow.mp4) to see a walk-through of the customer scenario for Bamazon.

## Getting started for managers

1) Download the GitHub repo to your computer
2) In your terminal navigate to where you stored the repo and open the folder and open your terminal from the bamazonManager.js file
3) Ensure node and npm is installed on your computer. If you do not see a package.json folder run npm init in your command line
4) Install 2 npm packages: a) mysql and b) inquirer
5) Next you need to create the database. Run -mysql -uroot -p in your CLI
6) If successful run source bamazon.sql - this will create the database. type 'exit' in the command line to return to the folder
7) Run node bamazonManager.js
8) Follow the prompts to interact with the table data

### Manager scenario demo
Downalod this [video](https://github.com/jennhenn18/Bamazon/blob/master/assets/managerworkflow.mp4) to see a walk-through of the manager scenario for Bamazon.


## Technologies used

For the creation of Bamazon I used the following technologies:
- **NodeJS**
- **NPM packages**:
    - [MYSQL](https://www.npmjs.com/package/mysql)
    - [Inquirer](https://www.npmjs.com/package/inquirer)
- **Database**:
    - [MYSQL](https://www.mysql.com/)

*Deployed site [here](https://jennhenn18.github.io/Bamazon/)*