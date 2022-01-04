const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/register', (req,res)=>{
    res.render("./pagina/usuario/register.hbs");
});

router.post('/register', passport.authenticate('local.register',{
    successRedirect: "/login",
    failureRedirect: "/register",
    failureFlash: true
}));

router.get('/login', (req,res)=>{
    res.render("./pagina/usuario/login.hbs");
});

router.post('/login', async (req,res,next)=>{
    passport.authenticate('local.login',{
        successRedirect: "/cuenta",
        failureRedirect: "/login",
        failureFlash: true
    })(req,res,next);
});

router.get('/salir', (req,res)=>{
    req.logOut();
    res.redirect('/login');
});

router.get('/cuenta', (req,res)=>{
    res.render("./pagina/usuario/cuenta.hbs");
});
module.exports =router;

