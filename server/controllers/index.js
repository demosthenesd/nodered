const models = require("../database/models");

const getAllLocations = async (req, res) => {
  try {
    const locations = await models.location.findAll();
    return res.status(200).json({ locations });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllLocations,
};
