const knex=require("../db/connection")
//POST /suppliers endpoint-create a new supplier in the databse 1.create suppliers.service
//in suppliers function
function create(supplier){
    return knex("suppliers")
    .insert(supplier)           //insert method used to insert a new row into the table; accepts arg. an object containing data for the new supplier
    .returning("*")         //chain a returning() method to insert() to specify which columns should be returned by the insert();passed column param may              
    .then((createdRecords)=>createdRecords[0])      //be a string or an array(returning() also works for update and delete methods)
}
//insert() method can be used to insert more than one resors, so it returns an array of the records inserted.
//For this API only one supplie will ever be inserted at a time so you chain .then((createdRecords)=>createdRecords[0]) to return only the one inserted record


//-----Put /supplier/:supplierID-----//
//Ability to update an existing supplier in the database
//You can use Knex update() to update a row in the table.  Update() method accepts as its
//argument an object that contains the data for updating the existing supplier
//1.add read and update() to suppliers.service; You are creating read so you can use this function
//for validation in the route handlers later on 
function read(supplier_id){
    return knex("suppliers").select("*").where({supplier_id}).first()
    }

function update(updatedSupplier){
    return knex("suppliers")
    .select("*")
    .where ({suppplier_id: updatedSupplier.supplier_id})
    .update(updatedSupplier, "*")
    //.then((updatedRecords) => updatedRecords[0]); } it says to do this not sure why?
}

module.exports={
    create,
    read,
    update
}