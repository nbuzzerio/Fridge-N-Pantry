require('dotenv').config()
const mongoose = require('mongoose');
const households = require('./routes/households');
const auth = require('./routes/auth');
const users = require('./routes/users');
const items = require('./routes/items');
const express = require('express');
const app = express();


mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/households', households);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/items', items);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));