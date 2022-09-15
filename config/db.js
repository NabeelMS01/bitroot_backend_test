const mongoose =require('mongoose')


 

const connectDb= async()=>{
    try {
        let  URI = "mongodb+srv://nabeel:mampallil@cluster0.ezuwebf.mongodb.net/?retryWrites=true" 
        console.log(URI);
         
        mongoose.connect(URI ,(err)=>{
            if(err)throw err;
                
                console.log("mongo db connected");
            
        })
    } catch (error) {
        console.log(`error:${error.message}`);
        process.exit();
    }
}

module.exports = connectDb