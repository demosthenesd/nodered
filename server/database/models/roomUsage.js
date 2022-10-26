const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "roomUsage",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      used_as_intended: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      consult_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "room_usage",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "room_usage_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
