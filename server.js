const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
//This property is a string used to sign the session ID cookie. It's essential for enhancing the security of session data.
    secret: 'Super secret secret',

//This property is an object that defines various options for the session cookie. In this case, it's an empty object, meaning the default options will be used.
    cookie: {},

//This property determines whether the session should be saved back to the session store, even if the session was not modified during the request. Setting it to false improves performance by preventing unnecessary session updates.
    resave: false,

//This property indicates whether a new session should be saved to the store if it's new but not modified. Setting it to true allows the session to be stored even if it's uninitialized.
    saveUninitialized: true,

//This property specifies the session store where session data will be persisted. In this case, it's set to a new instance of SequelizeStore, which is a session store for Sequelize, an ORM for Node.js. It's configured with the db option pointing to a Sequelize database connection (sequelize). This means that session data will be stored in the specified Sequelize database.
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//This is to test the logout route in postman
app.use((req, res, next) => {
    req.session.logged_in = true;
    next();
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`))
})