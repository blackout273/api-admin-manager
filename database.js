import mongoose from 'mongoose'


class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect("mongodb+srv://dnascimento:iHkOJVA2dzI80xfg@cluster0.ocmkior.mongodb.net/?retryWrites=true&w=majority")
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
export default new Database()