require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const version = process.env.version || 'dbPG'
const config = require('../config/config')[version]
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config.options)
// const sequelize = new Sequelize(config.database, config.user, config.password, config.options)

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

Object.keys(db).forEach((model) => {
  if ('associate' in db[model]) {
    db[model].associate(db)
  }
})

db.sequelize = sequelize

db.Sequelize = Sequelize

module.exports = db
