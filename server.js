const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body

const Route = require ('./router');

// Use your router for API routes
app.use('', Route);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 