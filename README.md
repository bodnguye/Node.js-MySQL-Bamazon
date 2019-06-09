# Node.js-MySQL-Bamazon

**Contributor**: `Bobby Nguyen`

**Created on**: `June 7 2019`

## Introduction
An Amazon-like CLI storefront built with mySQL, NODE.js and Inquirer NPM. The app can take in orders from customers, calculate sales price and deplete stock from the store's inventory.

## Technologies Used
- Node.js
- JavaScript
- MYSQLWorkbench
- Node Packages:
    - mysql
    - inquirer

## Instruction Guide
1. Open terminal.
3. Navigate to the `Node.js-MYSQL-Bamazon` folder that contains the `bamazonCustomer.js` file. 
4. Create the database and table using the `Bamazon-schema.sql` and `bamazaon-seeds.sql` file.
5. Run the following Commands.
6. Get results

     **Use-Case 1**: Run the `bamazonCustomer.js` file
    
        node bamazonCustomer.js

    Output: Bamazon will display a list of the products in the bamazon database. It will then prompt you `Which item would you like to buy? (Enter the item_id)`.

    See screenshot:

    ![Results](/screenshots/bamazonCustomerList)

    **Enter a item_id and quantity**:
        
        - Ff the quantity demanded is more than the quantity supplied this response will be shown.

    See screenshot:

    ![Results](/screenshots/insufficient.png)

        - If the purchase goes through, it updates the stock quantity to reflect the purchase and show total price amount.

    See screenshot:

    ![Results](/screenshots/sufficient.png)



         



