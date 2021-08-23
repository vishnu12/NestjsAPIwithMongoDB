

export class CreatedUser{
    name:string
    email:string
}

export class UserInput{
    name:string
    email:string
    password:string
}

export class LoginInput{
    email:string
    password:string
}

export class LoginOut{
    email:string
    token:string
}