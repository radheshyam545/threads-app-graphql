import UserService, { CreateUserPayload } from "../../services/user"

const queries = {

    getUserToken:async(_:any,payload:{email:string,password:string})=>{
        const token = await UserService.getUserToken({email:payload.email,password:payload.password})
        return token
    },
    getCurrentLoggedInUser: async(_:any,parameters:any,context:any)=>{
        // return "I don't know  who are you?" // ye return nhi kr skte because typedef me return type User de rkha hia
        console.log('context',context);
        if(context && context.user){
            const id = context.user.id
            const user = await UserService.getUserById(id)
          return  user;
        }

        throw new Error("I don't know who are you")

    }
}

const mutations = {
    createUser:async(_:any,payload:CreateUserPayload)=> {
        const res = await UserService.createUser(payload)
        return res.id
    }
}

export const resolvers = {queries,mutations}