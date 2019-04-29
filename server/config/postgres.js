const { Pool } = require('pg')

let host, user, password, database;

switch(process.env.NODE_ENV){
  case 'staging':
    host = 'bazaardb.ctelejehikjp.us-east-2.rds.amazonaws.com';
    user = 'bazaar_user';
    password ='bazaarpassword';
    database = 'bazaar_db';
    break;
  case 'development':
    host = 'bazaardb.ctelejehikjp.us-east-2.rds.amazonaws.com';
    user = 'bazaar_user';
    password ='bazaarpassword';
    database = 'bazaar_db';
    break;
  case 'production':
    host = 'localhost';
    user = 'alamtalash';
    password ='';
    database = 'postgres';
    break;
  default:
    break;
}

console.log("host is", host)
console.log("password is", password)

console.log("database is", database)


const postgres = new Pool({
  host: host,
  user: user,
  password: password,
  database: database,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports = postgres


// const postgres = new Pool({
//   host: process.env.PG_HOST || 'localhost',
//   user: process.env.PG_USER || 'alamtalash',
//   password: process.env.PG_PASSWORD || '',
//   database: process.env.PG_DB || 'postgres',
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })