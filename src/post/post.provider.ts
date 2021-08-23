
import Post from '../schemas/post/post.schema'

export const postProviders=[
    {
        provide:'POST_MODEL',
        useFactory:()=>Post,
        inject:['DATABASE_CONNECTION']
    }
]