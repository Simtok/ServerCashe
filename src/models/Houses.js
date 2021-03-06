module.exports = function (sequelize, DataTypes) {
  const Houses = sequelize.define(
    'Houses',
    {
      homenumber: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      sity: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  )

  Houses.associate = (models) => {
    Houses.hasMany(models.Citizens)
    Houses.hasMany(models.Payments)
  }

  return Houses
}
