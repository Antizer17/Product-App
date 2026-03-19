import dbConnect from "./dbConnect.js";
import Product from "./models/Products.js";
import Users from  "./models/Users.js"
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { genPassword,validPassword } from "./passwordUtils.js";


const options = {
    usernameField:'username',
    passwordField:'password'
}

const verifyCallback = (username,password,done)=>{
    Users.findOne({username:username})
        .then((user)=>{
            if(!user){
                return done(null,false)
            }
            const isValid = validPassword(password,user.hash,user.salt)
            if(isValid){
                return done(null,user)
            }else{
                return done(null,false)
            }
        })
        .catch((error)=>{
            done(error)
        })


}

const strategy = new LocalStrategy(options, verifyCallback)
passport.use(strategy)

export default passport;