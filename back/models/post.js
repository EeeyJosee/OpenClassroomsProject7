'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //TODO can add UserID specifically through Sequelize association (won't have to add the field)
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  Post.init({
    message: DataTypes.STRING,
    mediaUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    read: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};