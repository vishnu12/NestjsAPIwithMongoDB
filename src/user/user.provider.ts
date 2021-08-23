
import User from '../schemas/user/user.schema'

export const userProviders=[
    {
        provide:'USER_MODEL',
        useFactory:()=>User,
        inject:['DATABASE_CONNECTION']
    }
]