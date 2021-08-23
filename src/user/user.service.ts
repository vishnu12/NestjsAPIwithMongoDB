import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { Model } from 'mongoose';
import { CreatedUser, LoginInput, LoginOut, UserInput } from './dto/user.dto';
import { User as UserInteface} from './interfaces/user.interface';


@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL')
        private userModel:Model<UserInteface>
    ){}

    async register(input:UserInput):Promise<UserInteface>{
      try {
        const newUser=new this.userModel(input)
        const userCreated=await newUser.save()
        userCreated.password=undefined
        return userCreated
      } catch (error) {
          throw new HttpException('failed',400)
      }

    }

    async login(input:LoginInput):Promise<LoginOut>{
      const {email,password}=input
   try {
       const userExists=await this.userModel.findOne({email})
       if(userExists && await userExists.comparePassword(password)){
          const token=jwt.sign({id:userExists._id},'dssdfsdf',{
            expiresIn:'1d'
          })
          return {
            email:userExists.email,
            token
          }
       }else{
           throw new HttpException('failed',400)
       }
   } catch (error) {
       throw new HttpException('Login failed',400)
   }
    }
}
