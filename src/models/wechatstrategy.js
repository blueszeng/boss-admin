export default (sequelize, DataTypes) => {
  const Wechatstrategy = sequelize.define('Wechatstrategy', {
    userId: {
      type: DataTypes.INTEGER,
      notEmpty: true,
    },
    openid: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    unionId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    }
  }, {
      underscored: true,
      tableName: 'wechatstrategys',
      indexes: [{ unique: true, fields: ['userId'] }],
      classMethods: {
      },
      instanceMethods: {
      }
    })
  return Wechatstrategy
}
