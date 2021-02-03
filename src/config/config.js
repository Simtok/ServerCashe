module.exports = {
  port: 4001,
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
