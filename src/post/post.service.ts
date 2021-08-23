import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post as PostInterface} from 'src/post/interfaces/post.interface';
import { PostBody } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_MODEL')
        private readonly postModel:Model<PostInterface>
    ){}

    async createPost(body:PostBody):Promise<PostInterface>{
         try {
             const newPost=new this.postModel(body)
             const createdPost=await newPost.save()
             return createdPost
         } catch (error) {
             throw new HttpException(`${error}`,400)
         }
    } 

    async getPosts():Promise<PostBody[]>{
       try {
           const posts=await this.postModel.find({}) as PostBody[]
           return posts
       } catch (error) {
           throw new HttpException('Posts not found',404)
       }
    }

    async getPostsById(id:string):Promise<PostBody>{
        try {
            const post=await this.postModel.findById(id)
            return post
        } catch (error) {
            throw new HttpException('Post not found',404)
        }
    }
}
