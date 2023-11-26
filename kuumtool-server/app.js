const express = require('express');
const spotsRouter = require('./routes/spots');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/api/spots', spotsRouter);

app.listen(port, '0.0.0.0',() => {
  console.log(`Server is running on port ${port}`);
});
