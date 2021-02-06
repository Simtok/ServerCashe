module.exports = function (sequelise, DataTypes) {
  const Expenses = sequelise.define(
    'Expenses',
    {
      name: {
        type: DataTypes.STRING,
      },
      dateOfExpenditure: DataTypes.DATEONLY,
      summOfExpenditure: DataTypes.DECIMAL(10, 2),
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  )

  return Expenses
}
