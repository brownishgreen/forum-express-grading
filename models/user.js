'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Comment, { foreignKey: 'userId' })
      User.belongsToMany(models.Restaurant, {
        through: models.Favorite,
        foreignKey: 'userId',
        as: 'FavoritedRestaurants'
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      field: 'is_admin' // 將 Sequelize 模型的 isAdmin 映射到資料庫中的 is_admin
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
