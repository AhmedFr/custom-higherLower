var express = require("express");
var router = express.Router();
const Category = require("../models/Category");
const Value = require("../models/Value");
const sequelize = require("../config/sequelize");
const VALUES_MAX_LIMIT = 12;

router.get("/", async function (req, res, next) {
  const category_id = req.query.category_id;
  if (!category_id) {
    res.status(400).send("Category id required");
    return;
  }

  try {
    const category = await Category.findOne({
      where: {
        id: category_id,
      },
    });
    if (!category) {
      res.status(404).send("Category not found");
      return;
    }

    const values = await Value.findAll({
      where: {
        category_id: category_id,
      },
      attributes: ["name", "image", "id"],
      limit: VALUES_MAX_LIMIT,
      order: sequelize.random(),
    });

    const initial_item = await Value.findOne({
      where: {
        category_id: category_id,
      },
      attributes: ["id", "name", "image", "value"],
      order: sequelize.random(),
    });

    res.status(200).send({
      total: values.length,
      initial_item: initial_item,
      values: values,
    });
  } catch (error) {
    res.status(500).send("Could not fetch values");
  }
});

module.exports = router;
