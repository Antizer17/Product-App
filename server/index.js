import express from 'express'
import dbConnect from './dbConnect.js'
import productRoute from './routes/productRoute.js'  
import cors from 'cors'
import path from 'path'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from "./passport.js"
import {genPassword , validPassword } from './passwordUtils.js'
import Users from './models/Users.js'



const port =process.env.PORT
const app = express()
const __dirname = path.resolve()

app.listen(port,()=>{
    console.log(`Server running at port ${port}!`)
    dbConnect()
})
app.use(cors());

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_very_secure_secret', // A random string to sign the session ID
    resave: false, // Don't save session if it wasn't modified
    saveUninitialized: true, // Don't create session until something is stored
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, // Uses your existing MongoDB connection string
        collectionName: 'sessions' // This creates the separate collection in your DB
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 Day (in milliseconds)
         // Prevents client-side JS from reading the cookie (Security!)
       
    }
}))
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// This uses the ID from the session to find the user in DB on every request
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findById(id);
        done(null, user); // This populates req.user
    } catch (err) {
        done(err);
    }
});
app.use(passport.initialize())
app.use(passport.session())

app.get('/api/check-session', (req, res) => {
    console.log("Session ID:", req.sessionID);
    console.log("Full Session Object:", req.session);
    console.log("Authenticated User:", req.user);

    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            user: req.user,
            session: req.session
        });
    } else {
        res.json({ isAuthenticated: false });
    }
});

app.use('/api/products',productRoute)
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            return res.status(200).json({
                message: 'Login successful',
                user: user
            });
        });
    })(req, res, next);
});
app.post('/register', (req,res,next)=>{
    const saltHash = genPassword(req.body.password)
    const salt = saltHash.salt
    const hash = saltHash.hash
    const newUser = new Users({
        username:req.body.username,
        salt:salt,
        hash:hash

    })
    newUser.save()
        .then(
            (user)=>console.log(user)
        )
    res.json({success:true, message:'Registration successful!'})
}) 

app.get('/api/logout', (req, res, next) => {
    // This function is provided by Passport.js to clear req.user
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        
        // This destroys the session in MongoDB
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Could not log out" });
            }
            
            // Clear the cookie in the browser
            res.clearCookie('connect.sid'); 
            res.json({ message: "Logged out successfully" });
        });
    });
});
app.get('/api/login-status',(req,res,next)=>{
    if(req.isAuthenticated()){
        res.json({success:true,message:'Authenticated'})
    }else{
        res.json({success:false,message:'Not Authenticated'})
    }
})


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'client','Product App','dist')))
       app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.sendFile(path.join(__dirname,"client","Product App",'dist','index.html'))
    }
    next()
})
    
}






