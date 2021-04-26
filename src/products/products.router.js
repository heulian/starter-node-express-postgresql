const router = require("express").Router({ mergeParams: true });
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//Validate :productId with regex; to ensure that a route param :productId in path
//products/prodyctId consists of just one or more digits, prepend the regex expression
//([0-9]+) to end of path 
router.route("/:productId([0-9]+)").get(controller.read).all(methodNotAllowed);

module.exports = router;
