/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projectBids', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    projects: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attachments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    users: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'projectBids'
  });
};
