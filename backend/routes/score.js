var express = require("express");
var router = express.Router();
const { isAuthorized } = require("../utils/isAuthorized");
const Score = require("../models/Score");

router.post("/", async function (req, res, next) {
  const user = isAuthorized(req, res, next);
  if (!user) {
    res.status(401).send("Not authorized");
    return;
  }

  const score = req.body.score;
  if (score === null || score === undefined) {
    res.status(400).send("Score required");
    return;
  }

  const category_id = req.body.category_id;
  if (!category_id) {
    res.status(400).send("Category id required");
    return;
  }

  try {
    const highScore = await Score.findOne({
      where: {
        user_id: user.id,
        category_id: category_id,
      },
    });

    if (highScore && highScore.value > score) {
      res.status(200).send("Score not saved");
      return;
    }
    if (highScore) {
      await highScore.update({
        value: score,
      });
    } else {
      await Score.create({
        user_id: user.id,
        category_id: category_id,
        value: score,
      });
    }
    res.status(200).send("Score saved");
  } catch (error) {
    res.status(500).send("Could not save score");
  }
});

router.get("/", function (req, res, next) {
  const username = req.query.username;
  if (!username) {
    res.status(400).send("Username required");
    return;
  }
  const category_id = req.query.category_id;
  if (!category_id) {
    res.status(400).send("Category id required");
    return;
  }

  try {
    const score = Score.findOne({
      where: {
        username: username,
        category_id: category_id,
      },
    });
    if (!score) {
      res.status(404).send("Score not found");
      return;
    }
    res.status(200).send(score);
  } catch (error) {
    res.status(500).send("Could not fetch scores");
  }
});

module.exports = router;
