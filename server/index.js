const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('| INFO | MongoDB database connection established successfuly')
});

const newsRouter = require('./routes/niewsList');
const categoriesRouter = require('./routes/categories');

// app.post('/auth-imitation', (req, res) => {
//   console.log(req.body);
//   res.send(true);
// });

app.use('/news', newsRouter);
app.use('/categories', categoriesRouter);

app.listen(PORT, () => {
  console.log(`| INFO | Server is running on port: ${PORT}`)
});
