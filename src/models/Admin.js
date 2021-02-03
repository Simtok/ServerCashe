module.exports = function (sequelize, DataTypes) {
  const Admin = sequelize.define(
    'Admin',
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
    },
  )

  return Admin
}
