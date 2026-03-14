import mongoose from 'mongoose'

async function dbConnect(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to the Database!')
    }catch(err){
        console.error(err)
    }
}

export default dbConnect;