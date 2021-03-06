module.exports = function (sequelize, DataTypes) {
  const Payments = sequelize.define(
    'Payments',
    {
      dateOfPayments: DataTypes.DATEONLY,
      summ: DataTypes.DECIMAL(10, 2),
      quarter: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },

    {
      timestamps: false,
      freezeTableName: true,
    },
  )
  Payments.associate = (models) => {
    Payments.belongsTo(models.Houses)
    Payments.belongsTo(models.Citizens)
  }

  return Payments
}
