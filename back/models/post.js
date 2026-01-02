'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }

  Post.init(
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      media: {
        type: DataTypes.STRING,
        allowNull: true
      },

      read: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );

  return Post;
};
