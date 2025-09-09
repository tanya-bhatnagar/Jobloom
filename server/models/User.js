import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resume: { type: String },
    //if u want that the only img is requiired so add recuired:true in this image field
    image: { type: String }
})

const User = mongoose.model('User',userSchema)

export default User;