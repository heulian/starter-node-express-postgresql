const knex=require("../db/connection") //requires the Knex instance from ./db/connection.js

function list(){                                //declares a function called list()
    return knex("categories").select("*")       //builds a query that selects all columns from categories table
}

module.exports={                                //exports the list() function so it
    list,                                       //can be required in other files
}                               //can add other fucntions inside the module.exports object youd like to export using commas

//the API should support the GET /categories endpoint, which retrieves a list of all
//categories
//^^^here we create the categories service object in categories.service.js