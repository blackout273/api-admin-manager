import mongoose from'mongoose';
let emailSchema = new mongoose.Schema({
    email: String
  })
  export default mongoose.model('dadosAdministradores', emailSchema)