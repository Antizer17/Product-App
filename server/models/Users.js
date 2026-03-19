import mongoose, { Mongoose } from 'mongoose'

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        maxlength:20
    },
    salt:{
        type:String,
        required:true,

    },
    hash:{
        type:String,
        required:true
    }
})
const Users = mongoose.model('Users',UserSchema)
export default Users;