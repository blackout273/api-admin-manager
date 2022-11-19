import mongoose from 'mongoose'


class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
  const uri = process.env.MONGODB_URI;
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