module.exports = function (sequelize, DataTypes) {
  const Payments = sequelize.define(
    'Payments',
    {
      dateOfPayments: DataTypes.DATEONLY,
      summ: DataTypes.DECIMAL(10, 2),
      quarter: DataTypes.STRING,
    },

    {
      timestamps: false,
      freezeTableName: true,
    },
  )
  Payments.associate = (models) => {
    Payments.belongsTo(models.Houses)
  }

  return Payments
}
