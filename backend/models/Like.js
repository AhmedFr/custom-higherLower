var sequelize = require("../config/sequelize");
var { DataTypes, Model } = require("sequelize");
var User = require("./User");
var Category = require("./Category");

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Like",
  },
);

module.exports = Like;
