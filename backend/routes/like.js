var express = require("express");
var router = express.Router();
const Category = require("../models/Category");
const Like = require("../models/Like");

router.post("/", async function (req, res, next) {
  const user = isAuthorized(req, res, next);
  if (!user) {
    res.status(401).send("Not authorized");
    return;
  }

  const category_id = req.body.category_id;
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
      res.status(400).send("Category not found");
      return;
    }

    const like = await Like.findOne({
      where: {
        user_id: user.id,
        category_id: category_id,
      },
    });
    if (like) {
      await like.destroy();
      res.status(200).send("Like removed");
      return;
    }
    await Like.create({
      user_id: user.id,
      category_id: category_id,
    });
    res.status(200).send("Like added");
  } catch (error) {
    res.status(500).send("Could not add like");
  }
});

module.exports = router;
