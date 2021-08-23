import { ObjectId } from "mongoose"

export class PostBody{
    post:string
    user:string | ObjectId
}

