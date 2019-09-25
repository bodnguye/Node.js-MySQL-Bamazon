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
2. Navigate to the `Node.js-MYSQL-Bamazon` folder that contains the `bamazonCustomer.js` file. 
3. Run `npm install`.
4. Create the database and table using the `Bamazon-schema.sql` and `bamazaon-seeds.sql` file.
5. Run the following Commands.
6. Get results

    **Use-Case 1**: Run the `bamazonCustomer.js` file
    
        node bamazonCustomer.js

    Output: Bamazon will display a list of the products in the bamazon database. It will then prompt you `Which item would you like to buy? (Enter the item_id)`.

    See screenshot:

    ![Results](/screenshots/bamazonCustomerList.png)

    **Enter a item_id and quantity**:
        
    - If the quantity demanded is more than the quantity supplied this response will be shown.

    See screenshot:

    ![Results](/screenshots/insufficient.png)

    - If the purchase goes through: it updates the stock quantity to reflect the purchase
    - calculate and updates the price_sales
    - calculate and show total price amount.

    See screenshot:

    ![Results](/screenshots/sufficient.png)

    **Use-Case 2**: Run the `bamazonManager.js` file
    
        node bamazonManager.js

   Output: Bamazon will display a list of options in the Manager View.

   See screenshot: 

   ![Results](/screenshots/managerview.png)

    **View Products For Sale**:

    - Selecting the `View Product For Sale` will create a table with item_id,product, department, price, and stock quantity columns.

    See screenshot:

    ![Results](/screenshots/viewProd4sale.png)

    **View Low Inventory**:

    - Selecting the `View Low Inventory` option will give you a table of products with a stock quantity less than 5.

    See screenshot: 

    ![Results](/screenshots/lowInv.png)

    **Add To Inventory**:

    - Selecting the `Add to Inventory` option will give you the table of all the products and prompt you
        - `Which item would you like to add more inventory? (Enter the item_id)`
        - `What is the quantity would you like to add?`.
    - You may comfirm by selecting the `View Product For Sale` option. 

    See screenshot:

    ![Results](/screenshots/add2Inv.png)

    **Add New Product**:

    - Selecting the `Add New Product` option will prompt you for the Product Name, Department, price, and stock Quantity.

    See screenchot:

    ![Results](/screenshots/AddNewProd.png)
    ![Results](/screenshots/viewNewProd.png)

    **Use-Case 3**: Run the `bamazonSupervisor.js` file
    
        node bamazonSupervisor.js

   Output: Bamazon will display a list of options in the Supervisor View.

   See screenshot: 

   ![Results](/screenshots/SupView.png)

   **View Product Sales by Department**:

   - Selecting the `View Product Sales by Department` option will give you the table with Department ID, Department, Over Head Cost, Product Sales, Total Profit columns.

   See screenshot: 

   ![Results](/screenshots/salesbyDep.png)

   **Create New Department**:

   - Selecting the `Create New Department` option will prompt you for Department Name and Over Head Cost. It will then insert the new data into the departments table.

   See screenshot: 

   ![Results](/screenshots/newDep.png)

   ![Results](/screenshots/newDepTable.png)





    






