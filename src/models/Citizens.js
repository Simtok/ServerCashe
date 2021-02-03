module.exports = function (sequelize, DataTypes) {
  const Citizens = sequelize.define('Citizens', {
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
    },
    {
      timestamps: false
    }
  )
  
  Citizens.associate = (models) => {
    Citizens.hasMany(models.Payments)
  }
  
  return Citizens
}
