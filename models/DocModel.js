const mongoose=require("mongoose");

const DocSchema=new mongoose.Schema({
    docid:{type:Number,unique:true},
    date:{
        type:[
            {date:{
                type:Date
            },
            st:{type:Array,default:[]},
            et:{type:Array,default:[]},
        }
        ]
    },
    
    slot:{type:String},
   
});

module.exports=mongoose.model("Doc",DocSchema);