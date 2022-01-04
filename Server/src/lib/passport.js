const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database')
const metodo= require('../lib/methods')

passport.use('local.login', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async(req, correo, contra,done)=>{ 
    const consulta = await db.query("select * from Cliente where correo=?;",[correo]);
    if(consulta.length >0){
        const user = consulta[0];
        const valido = await metodo.matchPass(contra, user.contra)
        if(valido){
            done(null, user ,req.flash('user',user));
        }else {
            done(null,false,req.flash('err','contraseña incorrecta'));  
        }
    }else {
        return done(null, false,req.flash('err','usuario no existe'))
    }
}));    

passport.use('local.register', new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'contra',
    passReqToCallback: true
}, async(req, nombre, contra, done)=>{ 
    const {telefono, correo} = req.body;
    const newCliente = {
        nombre,
        telefono,
        correo,
        contra
    };
    newCliente.contra = await metodo.encryptar(contra);
    const result = await db.query("insert into Cliente set ? ", [newCliente]);
    newCliente.id = result.insertId;
    return done(null,newCliente)
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
})


passport.deserializeUser(async (id,done)=>{
    const row = await pool.query('select * from Cliente where id=?',[id]);
    console.log(row[0]);
    done(null,row[0]);
})