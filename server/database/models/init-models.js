var DataTypes = require("sequelize").DataTypes;
var _location = require("./location");
var _patient = require("./patient");


function initModels(sequelize) {
  var location = _location(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);



  return {
    location,
    patient
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
