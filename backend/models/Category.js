var sequelize = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");
const User = require("./User");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { len: [3, 25] },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { len: [3, 25] },
    },
    description: {
      type: DataTypes.STRING,
    },
    metric: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 25] },
    },
    image: {
      type: DataTypes.STRING,
    },
    default_image_provider: {
      type: DataTypes.STRING,
      defaultValue: "unsplash",
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Category",
  },
);

module.exports = Category;
