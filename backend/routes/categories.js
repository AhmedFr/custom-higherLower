var express = require("express");
var categoriesRouter = express.Router();
const Category = require("../models/Category");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("../models/User");
const Like = require("../models/Like");

const CATEGORIES_MAX_LIMIT = 12;

const SORT_TYPES = ["likes", "createdAt"];

const ORDER_TYPES = ["ASC", "DESC"];

categoriesRouter.get("/", async function (req, res, next) {
  const limit = req.query.limit ?? CATEGORIES_MAX_LIMIT;
  const page = req.query.page ?? 1;
  const sort_by = req.query.sort_by ?? "likes";
  const order = req.query.order ?? "DESC";
  const search = req.query.search?.toLowerCase() ?? "";

  if (limit > CATEGORIES_MAX_LIMIT) {
    res.status(400).send("Limit too high");
    return;
  }

  if (page < 1) {
    res.status(400).send("Page too low");
    return;
  }

  if (!SORT_TYPES.includes(sort_by)) {
    res.status(400).send("Invalid sort type");
    return;
  }

  if (!ORDER_TYPES.includes(order)) {
    res.status(400).send("Invalid order type");
    return;
  }

  try {
    const categories = await Category.findAll({
      where: {
        slug: {
          [Op.like]: `%${search}%`,
        },
      },
      limit: limit,
      offset: (page - 1) * limit,
      order: sequelize.col(sort_by, order),
    });

    for (let i = 0; i < categories.length; i++) {
      const user = await User.findOne({
        where: { id: categories[i].dataValues.author_id },
      });
      if (!user) {
        res.status(500).send("Error fetching categories");
        return;
      }
      categories[i].dataValues.author = {
        username: user.dataValues.username,
        image: user.dataValues.image,
      };
      const likes = await Like.count({
        where: { category_id: categories[i].dataValues.id },
      });
      categories[i].dataValues.likes = likes;
    }

    res.status(200).send({
      total: categories.length,
      page: page,
      limit: limit,
      categories: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching categories");
  }
});

module.exports = categoriesRouter;
