import mongoose from "mongoose";

const connectDb=(async(req,res)=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODBURL}`);
        console.log(`MongoDb is connected!!!!! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDb could not be connected",error);
        process.exit(1);
    }
     
})

export default connectDb