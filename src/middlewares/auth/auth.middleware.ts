import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express';
import { IRequest } from 'src/post/interfaces/post.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: IRequest, res: Response, next: NextFunction) {
    try {
      const token=req.headers['authorization'].split(' ')[1]
    if(token){
       const {id}=jwt.verify(token,'dssdfsdf') as jwt.JwtPayload
       req.user=id
        return next();
    }else{
      res.status(400).json({message:'Authentication failed'})
    }
    } catch (error) {
      throw new HttpException('Invalid token',400)
    }
    
  }
}
