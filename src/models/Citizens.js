module.exports = function (sequelize, DataTypes) {
  const Citizens = sequelize.define(
    'Citizens',
    {
      name: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATEONLY,
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
    Citizens.belongsTo(models.Houses)
    Citizens.hasMany(models.Payments)
  }

  return Citizens
}
