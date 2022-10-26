const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "roomAvailability",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      consult_start_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      doctor_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      occupied: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "room_availability",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "room_availability_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
