const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    device_timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    device_coordinates: {
      type: "POINT",
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'location',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "location_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
