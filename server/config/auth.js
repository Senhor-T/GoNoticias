const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models/Users')

module.exports = function(passport){

 
function findUser(name) {
    return Users.findOne({ "name": name });
}
 
function findUserById(id) {
    const ObjectId = require("mongodb").ObjectId;
    return Users.findOne({ _id: ObjectId(id) });
}

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser((id,done)=>{
        try{
            const user = Users.findById(id)
            done(null, user)
        }catch(err){
            done(err,null)
        }
    }),

   

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
},
    async (name, password, done) => {
        try {
            const user = await findUser(name);
 
            // usuário inexistente
            if (!user) { return done(null, false) }
 
            // comparando as senhas
            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) return done(null, false);
 
            return done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
));

}