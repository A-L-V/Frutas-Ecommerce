//codigos necesarios
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const { database } = require('./key');
const session = require('express-session');
const mySqlSession = require('express-mysql-session')
const hander = require('express-handlebars');
const flash = require('connect-flash');
const passport = require('passport');

const port = process.env.port || 4000;
const app = express();
require('./lib/passport');

//middlewares
app.set('public', path.join(__dirname + 'public'));
app.set('views', path.join(__dirname + 'views'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//configuracion 
app.use(session({
    key:'cookie_usuario',
    secret: '121231',
    store: new mySqlSession(database),
    resave: false,
    saveUninitialized: false
}))

app.set('views', path.join(__dirname,'views')) 
app.engine('hbs', hander({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', 
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//variables globales
app.use((req,res,next)=>{
    app.locals.alerta = req.flash('alerta');
    app.locals.err = req.flash('err');
    app.locals.user = req.flash('user');
    console.log(app.locals.user)
    next();
});

//routers:
app.use(require('./routes/autenticacion'));
app.use(require('./routes/links'));

app.listen(port,()=>{
    console.log("Servidor corriendo");
});

//ventanas
/*para crear con https
const fs = require("fs");
const https =require("https");
const port = 443;
https.createServer({
    cert: fs.readFileSync('server.crt'),
    key: fs.readFileSync('server.key')
}, app).listen(port,()=>{
    console.log("Servidor https corriendo");
});*/
