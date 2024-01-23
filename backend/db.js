const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres'
});

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { len: [3, 20], isAlphanumeric: true}
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  refreshToken: {
    type: DataTypes.STRING
  },
  forgotPasswordToken: {
    type: DataTypes.STRING
  },
}, {
});

const Categories = sequelize.define('Categories', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { len: [3, 25], isAlphanumeric: true}
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { len: [3, 25], isAlphanumeric: true}
  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING,
  },
  default_image_provider: {
    type: DataTypes.STRING,
    defaultValue: 'unsplash'
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  author_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
}, {
});

const Values = sequelize.define('Values', {
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
      model: Categories,
      key: 'id'
    }
  }
}, {
});

const Scores = sequelize.define('Scores', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Categories,
      key: 'id'
    }
  },
  value: {
    type: DataTypes.INTEGER
  },
}, {
});

async function sync() {
  await sequelize.sync({ force: true });
  console.log('Database synced');
}

sync();

module.exports = sequelize;

