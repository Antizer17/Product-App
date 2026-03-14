import express from 'express'
import dbConnect from './dbConnect.js'
import mongoose from 'mongoose'
import Product from './models/Products.js'
const port =process.env.PORT
const app = express()

app.listen(port,()=>{
    console.log(`Server running at port ${port}!`)
    dbConnect()
})

app.use(express.json())

// Make sure you import your Product model at the top
// import Product from './models/Product.js';

app.post('/products',async (req,res)=>{
 const product = req.body
 if(!product.name || !product.price || !product.image){
    res.json({message:"Please fill all the fields!"})
 }
 const newProduct = new Product(product)
 try{
    await newProduct.save()
    res.status(201).json({
        message:"Product created successfully!"
    })
 }catch(error){
    console.error('Error in creating product:',error.message)
    res.status(500).json({success:false, message:"Server Error"})
 }
})

app.delete('/products/:id',async (req,res)=>{
const id = req.params.id
try{
    await Product.findByIdAndDelete(id)
    res.status(200).json({success: true, message:`ID ${id} deleted successfully.`})
}catch(error){
    res.status(404).json({success:false,message:`ID ${id} not found.`})
    console.error(error)
}
})

app.get('/products/:id',async (req,res)=>{
const id = req.params.id
try{
    const result = await Product.findById(id)
    res.status(200)
    res.send(result)
}catch(error){
    res.status(404).json({success:false,message:`ID ${id} not found.`})
    console.error(error)
}
})