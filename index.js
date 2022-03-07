const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);


const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // cookie lasts for 30 days in ms 
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //express will serve up production assets 
    //main.js or main.css
    app.use(express.static('client/build'));

    //express will serve up index.htmlfile if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html');
    });

}

const PORT = process.env.PORT || 5000;

app.listen(PORT);