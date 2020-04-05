const express = require('express');
const passport = require('passport')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT =process.env.PORT || 3001;
const app = express();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`=======> server now on port ${PORT}`)
})