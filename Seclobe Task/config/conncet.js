const mongoose =require ("mongoose");
const dotenv =require ('dotenv');

dotenv.config();
async function connect() {
    const db = await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB ');
    return db;
  }

  module.exports = connect;