const knex = require('knex');
const knexConfig = require('../knexfile')

const environment = process.env.NODE_ENV || 'development'

// const db = knex({
//   client: 'pg',  // 使用するデータベース（PostgreSQL）
//   connection: {
//     host: 'localhost',       // PostgreSQLサーバーのホスト（ローカルであればlocalhost）
//     user: 'your-username',   // PostgreSQLのユーザー名
//     password: 'your-password', // PostgreSQLのパスワード
//     database: 'your-database-name'  // 使用するデータベース名
//   }
// });

module.exports = knex(knexConfig[environment]);