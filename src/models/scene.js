export default (sequelize, DataTypes) => {
  const Scene = sequelize.define('Scene', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    }
  }, {
    underscored: true,
    tableName: 'scenes',
    indexes: [{unique: true, fields: ['id']}],
    classMethods: {
    },
    instanceMethods: {
    }
  })
  return Scene
}
