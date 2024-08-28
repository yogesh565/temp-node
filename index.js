const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const config = {
  user: 'sqladmin',
  password: 'Password123f4!',
  server: 'hrtportal-uat-uk-sql.database.windows.net',
  database: 'thrwportal-uat-uk-db',
  options: {
    encrypt: true, // Use encryption
    enableArithAbort: true // Optional, recommended for SQL Server
  }
};

// Route to test database connection
app.get('/test-db-connection', async (req, res) => {
  try {
    // Create a new connection pool
    let pool = await sql.connect(config);
    res.send('Connection to the database was successful!');
  } catch (err) {
    res.status(500).send(`Connection failed: ${err.message}`);
  } finally {
    // Close the pool
    await sql.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
