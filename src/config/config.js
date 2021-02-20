module.exports = {
  port: process.env.PORT || 4001,
  db: {
    database: 'cash',
    username: 'cash',
    password: 'cash',
    options: {
      dialect: 'sqlite',
      storage: './cash.sqlite',
      host: 'localhost',
    },
  },
}
