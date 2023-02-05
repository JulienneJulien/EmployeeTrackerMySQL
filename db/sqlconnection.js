const connection = require("./sqlconnection");
// TO CONNECT TO SQL DATABASE
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Pass',
      database: 'Business_db'
    },
    console.log(`Connected to the Business_db database.`)
  );

  module.exports = connection;
