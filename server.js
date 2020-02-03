const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express(); 

//Body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').mongoURI;


//Connet to Mongdb
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log(error));

app.get('/', (req, res) => res.send('Hello World'));

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is runnig on port ${port}`));