module.exports = {
  port: process.env.PORT || 4001,
  dbPG: {
    database: 'cashe',
    username: 'my_user',
    password: 'root',
    options: {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
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
