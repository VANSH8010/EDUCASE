const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const router = require ('./router');

// Use your router for API routes
app.use('/api', router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 