const { isAuthorized } = require("../utils/isAuthorized");
var express = require("express");
var router = express.Router();
const { isValidUrl } = require("../utils/isValidUrl");
const Category = require("../models/Category");
const User = require("../models/User");
const Score = require("../models/Score");
const Value = require("../models/Value");
const Like = require("../models/Like");
const { getGiphyUrl } = require("../utils/giphy");

const MINIMUM_NAME_LENGTH = 2;
const MAXIMUM_NAME_LENGTH = 100;
const MINIMUM_NUMBER_OF_VALUES = 10;

router.get("/", async function (req, res, next) {
  const category_slug = req.query.slug;
  if (!category_slug) {
    res.status(400).send("Missing category slug");
    return;
  }
  try {
    const category = await Category.findOne({
      where: {
        slug: category_slug,
      },
    });
    if (!category) {
      res.status(400).send("Category not found");
      return;
    }

    const author = await User.findOne({
      where: {
        id: category.dataValues.author_id,
      },
      attributes: ["username", "image"],
    });
    if (!author) {
      res.status(400).send("Author not found");
      return;
    }

    const high_scores = await Score.findAll({
      where: {
        category_id: category.dataValues.id,
      },
      order: [["value", "DESC"]],
      limit: 5,
    });
    let formattedScores = [];
    for (let i = 0; i < high_scores.length; i++) {
      const user = await User.findOne({
        where: {
          id: high_scores[i].dataValues.user_id,
        },
        attributes: ["username"],
      });
      formattedScores.push({
        username: user.dataValues.username,
        value: high_scores[i].dataValues.value,
      });
    }

    const likes = await Like.count({
      where: {
        category_id: category.dataValues.id,
      },
    });

    const total_values = await Value.count({
      where: {
        category_id: category.dataValues.id,
      },
    });

    res.status(200).send({
      id: category.dataValues.id,
      name: category.dataValues.name,
      description: category.dataValues.description,
      image: category.dataValues.image,
      likes: likes,
      createdAt: category.dataValues.createdAt,
      total_values,
      metric: category.dataValues.metric,
      author: {
        username: author.dataValues.username,
        image: author.dataValues.image,
      },
      highScores: formattedScores ?? [],
    });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/", async function (req, res, next) {
  const user = isAuthorized(req, res, next);
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { name, description, image, values, metric } = req.body;
  if (!name || !description || !image || !metric || values.length < MINIMUM_NUMBER_OF_VALUES) {
    res.status(400).send("Missing required information");
    return;
  }

  if (name.length > MAXIMUM_NAME_LENGTH || name.length < MINIMUM_NAME_LENGTH) {
    res.status(400).send(`Name must be between ${MINIMUM_NAME_LENGTH} and ${MAXIMUM_NAME_LENGTH} characters`);
    return;
  }
  if (description.length > MAXIMUM_NAME_LENGTH || description.length < MINIMUM_NAME_LENGTH) {
    res.status(400).send(`Description must be between ${MINIMUM_NAME_LENGTH} and ${MAXIMUM_NAME_LENGTH} characters`);
    return;
  }
  if (!isValidUrl(image)) {
    res.status(400).send("Invalid image");
    return;
  }

  for (let i = 0; i < values.length; i++) {
    if (
      !values[i].name ||
      values[i].value === null ||
      values[i].value === undefined
    ) {
      res
        .status(400)
        .send("Missing required information in values value number: " + i);
      return;
    }
    if (values[i].name.length > MAXIMUM_NAME_LENGTH || values[i].length < MINIMUM_NAME_LENGTH) {
      res.status(400).send(`Value name must be between ${MINIMUM_NAME_LENGTH} and ${MAXIMUM_NAME_LENGTH} characters`);
      return;
    }
    values[i].image = await getGiphyUrl(values[i].name);
  }
  const slug = name.toLowerCase().replace(/ /g, "-");

  try {
    const newCategory = await Category.create({
      name,
      description,
      image: image,
      default_image_provider: "giphy",
      metric,
      slug,
      author_id: user.id,
    });
    for (let i = 0; i < values.length; i++) {
      values[i].category_id = newCategory.dataValues.id;
    }
    const createdValues = await Value.bulkCreate(values);
    res.status(201).send({
      success: true,
      slug: newCategory.dataValues.slug,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/", async function (req, res, next) {
  const user = isAuthorized(req, res, next);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  const category_id = req.query.id;
  if (!category_id) {
    res.status(400).send("Missing category id");
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
    if (category.dataValues.author_id !== user.id) {
      res.status(401).send("Unauthorized");
      return;
    }
    await Category.destroy({
      where: {
        id: category_id,
      },
    });
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
