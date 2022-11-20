import mongoose from 'mongoose'


class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
  const uri = process.env.MONGODB_URI || "mongodb+srv://dnascimento:iHkOJVA2dzI80xfg@cluster0.ocmkior.mongodb.net/?retryWrites=true&w=majority";
     mongoose.connect(uri)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
export default new Database()