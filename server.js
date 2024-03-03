const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());

// Database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Customer',
    password: 'Admin@123',
    port: 5432, // Default PostgreSQL port
});

app.get('/api',async (req, res) =>{
  console.log("api");
  res.send("something");
})
// Endpoint to fetch data with pagination and sorting

app.get('/api/customer', async (req, res) => {
  console.log("keerthana");
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 20);
    console.log("pages",page);
    console.log("limit",limit);
    
    const offset = (page - 1) * limit;
    console.log("offset",offset);

    const sortBy = req.query.sortBy || 'created_at'; 
  
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM customertable LIMIT $1 OFFSET $2`, [limit, offset]);

    const data = result.rows;
    // console.log("data",data);
    client.release();
    // console.log("data",data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/data', async (req, res) => {
  console.log("keerthana");
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 20);
    console.log("pages",page);
    console.log("limit",limit);
    
    const offset = (page - 1) * limit;
    console.log("offset",offset);

    const sortBy = req.query.sortBy || 'created_at'; 
  
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM customertable ORDER BY ${sortBy} LIMIT $1 OFFSET $2`, [limit, offset]);

    const data = result.rows;
    // console.log("data",data);
    client.release();
    // console.log("data",data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/time', async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 20);
    console.log("pages",page);
    console.log("limit",limit);
    
    const offset = (page - 1) * limit;
    console.log("offset",offset);

    const sortByTime = req.query.sortByTime || 'created_time'; 
  
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM customertable ORDER BY ${sortByTime} LIMIT $1 OFFSET $2`, [limit, offset]);

    const data = result.rows;
    // console.log("data",data);
    client.release();
    // console.log("data",data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/time', async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 20);
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'created_time';


    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM customertable ORDER BY ${sortBy} LIMIT $1 OFFSET $2`, [limit, offset]);

    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to search data by name or location
app.get('/api/search', async (req, res) => {
    try {
      const searchTerm = req.query.q; // Search term provided by the client
      if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
      }
  
      const client = await pool.connect();
      // Use ILIKE for case-insensitive search
      const result = await client.query('SELECT * FROM customertable WHERE customer_name ILIKE $1 OR location ILIKE $1', [`%${searchTerm}%`]);
      const data = result.rows;
      client.release();
  
      res.json(data);
    } catch (error) {
      console.error('Error searching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
