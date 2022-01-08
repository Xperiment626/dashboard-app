// Import modules

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const method_override = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

// Initiliazations

const app = express();
require('./database');

// Settings

app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', 'hbs')

// Middleware

app.use(express.urlencoded({ extended: false }));
app.use(method_override('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Global Variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.treatment = req.treatment || null;
    res.locals.client = req.client || null;
    next();
});

// Routes

app.use(require('./routes/home-router'));
app.use(require('./routes/dashboard-router'));
app.use(require('./routes/user-router'));
app.use(require('./routes/client-router'));
app.use(require('./routes/treatment-router'));

// Static Files

app.use(express.static(__dirname + '/public'));

// Server

app.listen(app.get('port'), () => {
    console.log('Listening on port', app.get('port'));
});