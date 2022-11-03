require('dotenv').config();
const env = process.env;

const development = {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    port: env.DB_PORT,
    dialect: "mysql",
    logging: false,
    timezone: "+09:00",
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
      dateStrings: true,
      typeCast: true
    }
};

const production = {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    port: env.DB_PORT,
    dialect: "mysql",
    timezone: "+09:00",
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
      dateStrings: true,
      typeCast: true
    }
};

const test = {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE_TEST,
    host: env.MYSQL_HOST,
    port: env.DB_PORT,
    dialect: "mysql",
    timezone: "+09:00",
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
      dateStrings: true,
      typeCast: true
    }
};
 
module.exports = { development, production, test };

 

