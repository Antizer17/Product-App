import Product  from '../models/Products.js'
import mongoose from 'mongoose'
import passport from '../passport.js'



export async function getAllProducts(req, res) {
    try {
        console.log("Is user authenticated?", req.isAuthenticated());
        
        if (req.isAuthenticated()) {
            const allProducts = await Product.find({});
            // Add 'return' to prevent code from continuing
            return res.status(200).json({ success: true, data: allProducts });
        } else {
            // IF YOU DON'T HAVE THIS, THE FRONTEND WILL HANG
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}


export const postProduct = async (req,res)=>{
const product = req.body
if(!product.name || !product.price || !product.image){
    res.json({message:"Please fill all the fields!"})
}
const newProduct = new Product(product)
try{
    await newProduct.save()
    res.status(201).json({
        success:true,
        message:"Product created successfully!"
    })
}catch(error){
    console.error('Error in creating product:',error.message)
    res.status(500).json({success:false, message:"Server Error"})
}
}

export const deleteProduct = ('/:id',async (req,res)=>{
const id = req.params.id
try{
    await Product.findByIdAndDelete(id)
    res.status(200).json({success: true, message:`ID ${id} deleted successfully.`})
}catch(error){
    res.status(404).json({success:false,message:`ID ${id} not found.`})
    console.error(error)
}
})

export const getProduct = ('/:id',async (req,res)=>{
const id = req.params.id
try{
    const result = await Product.findById(id)
    res.status(200)
    res.json({success:true, data:result})
}catch(error){
    res.status(404).json({success:false,message:`ID ${id} not found.`})
    console.error(error)
}
})

export const putProduct = ('/:id', async (req,res)=>{
    const id = req.params.id
    const productData = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:`Product ${id} not found`})
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,productData,{new : true})
        res.status(200).json({success:true,message:`Product ${id} updated successfully!`, data:`${updatedProduct}`})

    }catch(error){
        res.status(500).json({success:false,message:"Server Error"})
        console.error(error)
    }
})

