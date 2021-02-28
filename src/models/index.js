const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
// const config = require('../config/config')
const db = {}

const sequelize = new Sequelize('cashe', 'my_user', 'root', {
  host: 'localhost',
  dialect: 'postgres',
})

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Соединение установлено.')
//   })
//   .catch((err) => {
//     console.error('Ошибка соединения:', err)
//   })

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach((model) => {
  if ('associate' in db[model]) {
    db[model].associate(db)
  } else {
  }
})

db.sequelize = sequelize

db.Sequelize = Sequelize

module.exports = db
