const productsCategories = require("../fixtures/productsCategories");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE products_categories RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("products_categories").insert(productsCategories);
    });
};


//exports.seed = function(knex) {
//  // Deletes ALL existing entries
//  return knex('table_name').del()
//    .then(function () {
//      // Inserts seed entries
//      return knex('table_name').insert([
//        {id: 1, colName: 'rowValue1'},
//        {id: 2, colName: 'rowValue2'},
//        {id: 3, colName: 'rowValue3'}
//      ]);
//    });
//};
