const suppliersService=require ("./suppliers.service.js")
//require the suppliers service object at the top of suppliers.controller.js
//next create a validation middleware called hasValidFields() to check whether req.body contains a specified set of allowed fields
async function create(req, res, next) {
  res.status(201).json({ data: { supplier_name: "new supplier" } });
}



async function destroy(req, res, next) {
  res.sendStatus(204);
}

const hasProperties=require("../errors/hasProperties")
const hasRequiredProperties=hasProperties("supplier_name", "supplier_email")

const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];


function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}
//Next we will create validation middleware hasProperties to check if req.body includes
//2 require fields supplier_name and supplier_email
//Since hasProperties will be used by any controller as validation middleware we create a new file 
//we then require it here

function create(req, res, next) {
  suppliersService
    .create(req.body.data) //calls suppliersService.create w/ req.body.data as the argument; the req.body.data argument references the object containing the supplier info
    .then((data) => res.status(201).json({ data }))//recall that the create function in suppliersService created an object?? see below
    .catch(next);         //chaining then() to suppliersService.create() executes the Knex query
}//if the promis resolves successfully the server responds with a 201 status with the newly created supplier


//^^^after we create hasProperties we add the create function 
//function create(supplier){
//  return knex("suppliers")
//  .insert(supplier)           //insert method used to insert a new row into the table; accepts arg. an object containing data for the new supplier
//  .returning("*")         //chain a returning() method to insert() to specify which columns should be returned by the insert();passed column param may              
//  .then((createdRecords)=>createdRecords[0])      //be a string or an array(returning() also works for update and delete methods)
//}

//=======Add supplierExists() validation middleware in suppliers.controllers.js for PUT request-------
function supplierExists(req, res, next) {
  suppliersService
    .read(req.params.supplierId)
    .then((supplier) => {
      if (supplier) {
        res.locals.supplier = supplier;
        return next();
      }
      next({ status: 404, message: `Supplier cannot be found.` });
    })
    .catch(next);
}

//Chaining then() to suppliersService.read() will execute the Knex query that 
//you defined previously to retrieve a supplier given based on ID. 
//The query returns a promise, which is handled in the then() function.

//if supplier exists its stored in res.locals.supplier to accessible in rest of middleware 
//pipeline otherwise next called with error object 

//Next modify update
function update(req, res, next) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  suppliersService
    .update(updatedSupplier)
    .then((data) => res.json({ data }))
    .catch(next);
}
//^^^^ calls Suppliers.Service.update() method passing in the updatedSupplier object
//supplier_id of updatedSupplier is set to exisiting supplier_id(res.locals.supplier.supplier_id)
//to prevent the update from accdientally changing the supplier_id durting update
//if promise resolves successfully server responds with updated supplier
module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties,create],

  update: [supplierExists,hasOnlyValidProperties, hasRequiredProperties, update]
  delete: destroy,
};

//^^Finally add create and validation middleware to the module.exports object
