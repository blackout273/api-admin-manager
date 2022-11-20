import mongoose from'mongoose';
let emailSchema = new mongoose.Schema({
    email: String,
    senha:String,
    usuario:String
  })
  export default mongoose.model('dadosAdministradores', emailSchema)