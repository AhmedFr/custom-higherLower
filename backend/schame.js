const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

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
  },
  refreshToken: {
    type: DataTypes.STRING
  },
}, {
});

const Categories = sequelize.define('Categories', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
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
    type: DataTypes.INTEGER,
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
    primaryKey: true
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
    type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
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

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true