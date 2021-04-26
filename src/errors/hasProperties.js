//Validation middleware created in new file so can be used by any controller


function hasProperties(...properties) {
    return function (req, res, next) {
      const { data = {} } = req.body;
  
      try {
        properties.forEach((property) => {
          if (!data[property]) {
            const error = new Error(`A '${property}' property is required.`);
            error.status = 400;
            throw error;
          }
        });
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  module.exports = hasProperties;