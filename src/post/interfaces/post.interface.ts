
import {Document} from 'mongoose'
import {Request} from 'express'
import {User} from '../../user/interfaces/user.interface'

export interface Post extends Document{
    post:string,
    user:User['_id']
}

export interface IRequest extends Request{
    user:User['_id']
}