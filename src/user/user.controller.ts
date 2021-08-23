import { Body, Controller, Post } from '@nestjs/common';
import { PostBody } from 'src/post/dto/post.dto';
import { CreatedUser, LoginInput, UserInput } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @Post('/register')
    async register(
        @Body() body:UserInput
    ):Promise<User>{
      return this.userService.register(body)
    }

    @Post('/login')
    async login(
        @Body() body:LoginInput
    ){
      return this.userService.login(body)
    }
}
