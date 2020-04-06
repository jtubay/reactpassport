const express = require('express');
// const Sequelize = require('sequelize')
const logger = require('morgan')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('./utils/passport')
const db = require('./models')

const PORT =process.env.PORT || 3001;

const app = express();


//middleware
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }))
app.use(passport.initialize());
// app.use(passport.session());

//config
// passport.use(db.User.createStrategy())
// passport.serializeUser(db.User.serializeUser());
// passport.deserializeUser(db.User.deserializeUser())


app.get('/api/test', passport.authenticate('jwt'), (req, res) => {
    res.send('Its working')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

db.sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`=======> server now on port ${PORT}`)
        })
    })
    .catch(err => console.log(err));
