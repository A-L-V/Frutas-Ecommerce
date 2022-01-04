const metodo = {}
const bcrypt = require('bcryptjs');

metodo.encryptar = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

metodo.matchPass = async(password, savePassword)=>{
    return await bcrypt.compare(password,savePassword);
};

module.exports = metodo;
