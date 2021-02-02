const mongoose = require("mongoose");

const imageSchema=new mongoose.Schema({
    image:[{
        type:Buffer
    }],
    username:{
        type:String
    },
    blogid:{
    
    }
},{
    timestamps:true
})
const BlogImage=mongoose.model('blogimage',imageSchema)
module.exports=BlogImage