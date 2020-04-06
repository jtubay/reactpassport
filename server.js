const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("./utils/passport");
const db = require("./models");

const PORT = process.env.PORT || 3001;

const app = express();

//middleware
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/login', (req, res) => {
    const { email, password } = req.body
    db.User.findOne({
        email
    }, (err, user) => {
        if(err) throw err;
        if(!user)
            return res.status(401).json({success: false, msg: 'Authentication failed.'})

        if(password === user.password) {
            const token = jwt.sign(user.toJSON(), settings.secret);
            res.json({success: true, token: 'JWT' + token})
        } else {
            res.status(401).send({success: false, msg: 'Authentication failed. wrong pw'})
        }
    })
})

//API ROUTES
app.get("/api/test", passport.authenticate("jwt", { session:false }), (req, res) => {
  res.send("Its working");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`=======> server now on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
