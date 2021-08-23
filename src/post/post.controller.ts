import { Controller, Post,Body, Req, Get,Param } from '@nestjs/common';
import { PostBody } from './dto/post.dto';
import { IRequest } from './interfaces/post.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(
        private readonly postService:PostService
    ){}


    @Get()
    async getPosts():Promise<PostBody[]>{
      return this.postService.getPosts()
    }

    @Get('/:id')
    async getPostsById(
      @Param('id') id:string
    ):Promise<PostBody>{
      return this.postService.getPostsById(id)
    }

    @Post('/create')
    async createPost(
        @Req() req:IRequest,
        @Body() body:PostBody
    ){
       const newData={
           ...body,
           user:req.user
       }
      return this.postService.createPost(newData)
    }
}
