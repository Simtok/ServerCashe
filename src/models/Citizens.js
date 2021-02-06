module.exports = function (sequelize, DataTypes) {
  const Citizens = sequelize.define(
    'Citizens',
    {
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  )

  Citizens.associate = (models) => {
    // Citizens.hasMany(models.Payments)
    // Citizens.belongsTo(models.Buldings)
  }

  return Citizens
}
