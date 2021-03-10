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
  productions: {
    database: 'd16380rb1c3veq',
    username: 'wotedxuggsilhn',
    password: '476a1d4b2f1e087f1e06382eed842ed253601be1bb8dab4c7a443cfffb3a336c',
    options: {
      host: 'ec2-3-232-163-23.compute-1.amazonaws.com',
      dialect: 'postgres',
      port: 5432,
    },
  },
}
