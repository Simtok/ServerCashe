module.exports = {
  port: process.env.PORT || 4001,
  dbPG: {
    database: 'cashe',
    username: 'postgres',
    password: 'root',
    options: {
      host: 'localhost',
      dialect: 'postgres',
    },
  },
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
