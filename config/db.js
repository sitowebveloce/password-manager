const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${connect.connection.host}`.blue)
    }
    catch(error){
        if(error)console.log(error);
    }
}

module.exports = connectDB;