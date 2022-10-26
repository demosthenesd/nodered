const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "patient",
    {
      contact_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      address: {
        type:DataTypes.TEXT,
        allowNull: false,
      },
      suburb: {
        type:DataTypes.TEXT,
        allowNull: false,
      },
      country: {
        type:DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "patient",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "patient_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
