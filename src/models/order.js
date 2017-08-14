export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      notEmpty: true,
    },
    sdcustomno: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    money: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        defaultValue: 0
      }
    },
    state: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        defaultValue: 0
      }
    },
    createTime: {
      type: DataTypes.DATE,
      validate: {
        defaultValue: DataTypes.NOW
      }
    }
  }, {
      underscored: true,
      tableName: 'orders',
      indexes: [{ unique: true, fields: ['sdcustomno'] }],
      classMethods: {
      },
      instanceMethods: {
      }
    })
  return Order
}
