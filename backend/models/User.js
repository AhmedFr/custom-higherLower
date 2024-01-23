var sequelize = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { len: [3, 20], isAlphanumeric: true },
    },
    image: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    forgotPasswordToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  },
);

module.exports = User;
