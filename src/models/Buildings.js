module.exports = function (sequelize, DataTypes) {
  const Buldings = sequelize.define(
    'Buildings',
    {
      homenumber: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  )

  Buldings.associate = (models) => {
    Buldings.hasMany(models.Citizens)
    Buldings.hasMany(models.Payments)
  }

  return Buldings
}
