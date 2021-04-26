const suppliersService=require ("./suppliers.service.js")
//require the suppliers service object at the top of suppliers.controller.js
//next create a validation middleware called hasValidFields() to check whether req.body contains a specified set of allowed fields
async function create(req, res, next) {
  res.status(201).json({ data: { supplier_name: "new supplier" } });
}

async function update(req, res, next) {
  res.json({ data: { supplier_name: "updated supplier" } });
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


module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties,create],

  update,
  delete: destroy,
};
//^^Finally add create and validation middleware to the module.exports object