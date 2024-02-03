var express = require("express");
var router = express.Router();
const Value = require("../models/Value");

const GUESS_TYPES = {
  HIGHER: "higher",
  LOWER: "lower",
};

router.post("/", async function (req, res, next) {
  const item_id = req.body.item_id;
  if (!item_id) {
    res.status(400).send("Item id required");
    return;
  }

  const next_item_id = req.body.next_item_id;
  if (!next_item_id) {
    res.status(400).send("Next item id required");
    return;
  }

  const guess = req.body.guess;
  if (!guess) {
    res.status(400).send("Guess required");
    return;
  }

  try {
    const item = await Value.findOne({
      where: {
        id: item_id,
      },
    });

    if (!item) {
      res.status(400).send("Item not found");
      return;
    }

    const next_item = await Value.findOne({
      where: {
        id: next_item_id,
      },
    });

    if (!next_item) {
      res.status(400).send("Next item not found");
      return;
    }

    if (
      guess === GUESS_TYPES.HIGHER &&
      item.dataValues.value < next_item.dataValues.value
    ) {
      res.status(200).send({
        success: true,
        next_item: next_item.dataValues,
      });
      return;
    }

    if (
      guess === GUESS_TYPES.LOWER &&
      item.dataValues.value > next_item.dataValues.value
    ) {
      res.status(200).send({
        success: true,
        next_item: next_item.dataValues,
      });
      return;
    }

    if (item.dataValues.value === next_item.dataValues.value) {
      res.status(200).send({
        success: true,
        next_item: next_item.dataValues,
      });
      return;
    }

    res.status(200).send({
      success: false,
      next_item: next_item.dataValues,
    });
  } catch (error) {
    res.status(500).send("Could not evaluate guess");
  }
});

module.exports = router;
