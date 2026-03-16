import express from 'express'
import dbConnect from './dbConnect.js'
import productRoute from './routes/productRoute.js'  
import cors from 'cors'
import path from 'path'




const port =process.env.PORT
const app = express()
const __dirname = path.resolve()

app.listen(port,()=>{
    console.log(`Server running at port ${port}!`)
    dbConnect()
})
app.use(cors());

app.use(express.json())
app.use('/api/products',productRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'client','Product App','dist')))
    app.get("/:any*",(req,res)=>{
        res.sendFile(path.join(__dirname,"client","Product App",'dist','index.html'))
    })
}



