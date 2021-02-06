module.exports = function (sequelize, DataTypes) {
  const Payments = sequelize.define(
    'Payments',
    {
      dateOfPayments: DataTypes.DATEONLY,
      summ: DataTypes.DECIMAL(10, 2),
    },

    {
      timestamps: false,
      freezeTableName: true,
    },
  )
  Payments.associate = (models) => {
    Payments.belongsTo(models.Buldings)
  }

  return Payments
}
