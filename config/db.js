const mongoose =require('mongoose')


 

const connectDb= async()=>{
    try {
        let  URI = "mongodb://0.0.0.0:27017/contact" 
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