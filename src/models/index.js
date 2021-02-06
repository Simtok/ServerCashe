const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options,
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение установлено.')
  })
  .catch((err) => {
    console.error('Ошибка соединения:', err)
  })

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model
  })

console.log(db)
Object.keys(db).forEach((model) => {
  if ('associate' in db[model]) {
    console.log(' IF ->', model)
    db[model].associate(db)
  } else {
    console.log(' Else ->', model)
  }
})

db.sequelize = sequelize

db.Sequelize = Sequelize

module.exports = db
