const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));