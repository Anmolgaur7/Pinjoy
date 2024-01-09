const mongoose=require('mongoose')
const URI='mongodb+srv://anmolgaur7:Cristiano7@cluster0.3ihk9zu.mongodb.net/?retryWrites=true&w=majority'

const connectdb=async ()=>{
    try {
        await mongoose.connect(URI,{
          useNewUrlParser:true,
          useUnifiedTopology:true
        });
        console.log("db connected")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports=connectdb