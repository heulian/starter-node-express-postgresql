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
module.exports={
    create,
}