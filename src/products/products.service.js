const knex=require("../db/connection")

function list(){
    return knex("products").select("*");
}

function read(product_id){               //this read function creates a Knex query that selects all columns from the products table where
    return knex("products").select("*").where({product_id}).first() //product_id matches the argument passed to the read function 
}               //the first() method retuens the first row in the table as an object
//creating a GET /products/:productId endpoint-specifically retrieves a product by its ID
//first we add read() to products.service.js
module.exports={
    list,
    read,                   //export read
}