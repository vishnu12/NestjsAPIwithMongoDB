import * as mongoose from 'mongoose'
import { Post } from 'src/post/interfaces/post.interface'



export const PostSchema=new mongoose.Schema<Post>({
    post:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,}
},{timestamps:true})


const Post=mongoose.model('Post',PostSchema)

export default Post