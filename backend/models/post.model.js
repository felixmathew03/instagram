import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    userId:{type:String},
    description:{type:String},
    photo:{type:String}
})

export default mongoose.model.Posts || mongoose.model("Post",postSchema);
