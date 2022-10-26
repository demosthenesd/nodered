const models = require("../database/models");

const getStatus = async (req, res) => {
  try {
    const status = await models.roomAvailability.findAll();
    return res.status(200).json({ status });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAvailability = async (req, res) => {
  try {
    const roomsOccupied = await models.roomAvailability.findAll(); // CHANGE TO COUNT OF OCCUPIED ROOMS
    const roomsAvailable = await models.roomAvailability.findAll(); // CHANGE TO COUNT OF AVAILABLE ROOMS
    return res.status(200).json({ roomsOccupied, roomsAvailable });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUsage = async (req, res) => {
  try {
    const roomsUsedAsIntended = await models.roomUsage.findAll(); // CHANGE TO COUNT OF ROOMS USED AS INTENDED
    const formsCompleted = await models.roomUsage.findAll(); // CHANGE TO COUNT OF FORMS COMPLETED
    const generalCheckupTotal = await models.roomUsage.findAll(); // CHANGE TO COUNT OF GENERAL CHECKUPS
    const followUptotal = await models.roomUsage.findAll(); // CHANGE TO COUNT OF FOLLOW UPS
    const xrayTotal = await models.roomUsage.findAll(); // CHANGE TO COUNT OF XRAYS
    const mriTotal = await models.roomUsage.findAll(); // CHANGE TO COUNT OF MRIS
    const injectionTotal = await models.roomUsage.findAll(); // CHANGE TO COUNT OF INJECTIONS
    return res.status(200).json({
      roomsUsedAsIntended,
      formsCompleted,
      generalCheckupTotal,
      followUptotal,
      xrayTotal,
      mriTotal,
      injectionTotal,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getStatus,
  getAvailability,
  getUsage,
};
