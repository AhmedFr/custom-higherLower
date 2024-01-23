var sequelize = require('../config/sequelize');
const { DataTypes, Model } = require('sequelize');
const Category = require('./Category');

class Value extends Model {}

Value.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
  },
  value: {
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Value'
});

module.exports = Value;