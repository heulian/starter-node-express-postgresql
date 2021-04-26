const categoriesService=require("./categories.service") 
//^^requiring the service object we created in the previous step and assigns it to categoriesService
//we can access methods on the service object to perform CRUD operations on the table;
//ie.categoriesService.list()

function list(req, res, next){
  categoriesService
    .list()           
    .then((data) => res.json({data})) //chaining then() to categoriesService.list()executes the Knex query
    .catch(next)  //Chaining catch(next) onto the promise will call next()passing in the error.
}

module.exports={
  list,
}

//here we are requiring the categories service object in categories.controller.js