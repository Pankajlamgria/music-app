const mongoose=require("mongoose");
const {Schema}=mongoose;
const recentschema=new Schema({
    songid:{type:Schema.Types.ObjectId,ref:"song"},
    userid:{type:Schema.Types.ObjectId,ref:"user"},
    songname:{type:String,required:true},
    artistname:{type:String,required:true},
    imgurl:{type:String,required:true},
    songurl:{type:String,required:true},
    language:{type:String,required:true},
    songtype:{type:String,required:true}
})
module.exports=mongoose.model("recentsong",recentschema);
