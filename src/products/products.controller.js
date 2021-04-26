const productsService=require("./products.service")

function read(req, res) {               //update read function 
  const {product: data}=res.locals
  res.json({ data})
}

function list(req, res, next) {
  productsService
  .list()
  .then((data)=>res.json({data}))
  .catch(next)
 
}
//GET products/:productId endpoint: 1.add read() to products.service.js 2.add productExists middleware
//to products.controller.js
//-create a validation middleware called productExists that checks whether a product exists based on on ID
function productExists(req,res,next){
  productsService
  .read(req.params.productId) //Chaining then() to productsService.read(productId)
  .then((product)=>{        //executes the Knex query we defined in products.servie(pasted below)
    if (product){         //to retrieve a product given an id.   The query returns a promise handled by then()
      res.locals.product=product //if product exists its stored in res.locals.products so it can be accessed in 
      return next()             //rest of middleware pipeline.  Otherwise next() is called with an error
    }                         //Next step we update the read function above
    next({status: 404, message: `Product cannot be found.`})
  })
  .catch(next)
}

//function read(product_id){    
//  return knex("products").select("*").where({product_id}).first() }
//this read function creates a Knex query that selects all columns from the products table where
//product_id matches the argument passed to the read function 
//the first() method returns the first row in the table as an object


module.exports = {
  read: [productExists,read],       //add productExists 
  list: [list],
};
