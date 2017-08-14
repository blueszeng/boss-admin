export default (sequelize, DataTypes) => {
  const Bet = sequelize.define('Bet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      notEmpty: true,
      type: DataTypes.INTEGER,
    },
    sceneId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      }
    },
    rateId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      }
    },
    periodNo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        // len: [1, 255]
      }
    },
    money: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true,
        // defaultValue: 0
      }
    },
    win: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true,
        // defaultValue: 0
      }
    },
    state: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        // defaultValue: false
      }
    }
  }, {
      underscored: true,
      tableName: 'bets',
      indexes: [{ unique: true, fields: ['id'] }],
      classMethods: {
      },
      instanceMethods: {
      }
    })
  return Bet
}
