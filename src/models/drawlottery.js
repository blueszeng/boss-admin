export default (sequelize, DataTypes) => {
  const Drawlottery = sequelize.define('Drawlottery', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    periodNo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    drawFirstNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 5]
      }
    },
    drawSecondNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 5]
      }
    },
    drawThirdNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 5]
      }
    },
    result: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    }
  }, {
      underscored: true,
      tableName: 'drawlotterys',
      indexes: [{ unique: true, fields: ['periodNo'] }],
      classMethods: {
      },
      instanceMethods: {
      }
    })
  return Drawlottery
}
