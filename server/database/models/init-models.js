var DataTypes = require("sequelize").DataTypes;
var _roomAvailability = require("./roomAvailability");
var _roomUsage = require("./roomUsage");

function initModels(sequelize) {
  var roomAvailability = _roomAvailability(sequelize, DataTypes);
  var roomUsage = _roomUsage(sequelize, DataTypes);

  return {
    roomAvailability,
    roomUsage,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;