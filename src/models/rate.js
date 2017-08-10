export default (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sceneId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      }
    },
    ratio: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true,
      }
    },
     selectName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    }
  }, {
      underscored: true,
      tableName: 'rates',
      indexes: [{ unique: true, fields: ['id'] }],
      classMethods: {
      },
      instanceMethods: {
      }
    })
  return Rate
}
