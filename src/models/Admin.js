module.exports = function (sequelize, DataTypes) {
  const Admins = sequelize.define(
    'Admins',
    {
      name: {
        type: DataTypes.STRING,
      },
      login: {
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  )

  return Admins
}
