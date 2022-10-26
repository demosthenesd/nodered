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
    const roomsOccupied = await models.roomAvailability.count({
      where: { occupied: true },
    });
    const roomsAvailable = await models.roomAvailability.count({
      where: { occupied: false },
    });
    return res.status(200).json({ roomsOccupied, roomsAvailable });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUsage = async (req, res) => {
  try {
    const roomsUsedAsIntended = await models.roomUsage.count({
      where: { used_as_intended: true },
    });
    const formsCompleted = await models.roomUsage.count();
    const generalCheckupTotal = await models.roomUsage.count({
      where: { consult_reason: "General checkup" },
    });
    const followUpTotal = await models.roomUsage.count({
      where: { consult_reason: "Follow-up" },
    });
    const xrayTotal = await models.roomUsage.count({
      where: { consult_reason: "XRAY" },
    });
    const mriTotal = await models.roomUsage.count({
      where: { consult_reason: "MRI" },
    });
    const injectionTotal = await models.roomUsage.count({
      where: { consult_reason: "Injection" },
    });
    return res.status(200).json({
      roomsUsedAsIntended,
      formsCompleted,
      generalCheckupTotal,
      followUpTotal,
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
