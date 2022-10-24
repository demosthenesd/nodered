var DataTypes = require("sequelize").DataTypes;
var _location = require("./location");

function initModels(sequelize) {
  var location = _location(sequelize, DataTypes);


  return {
    location,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
