type user = {
    email : string ,
    password : string,
    rememberMe : boolean
}
export default function IsValidateSignIn(client : user) : boolean{
    if(!client.email || !client.password){
        return false
    }

    if(client.email.length < 6 || client.password.length < 8){
        return false
    }

    return true 
}