type user = {
    name: string,
    email : string,
    password : string
}

export default function IsValidateSignUp(client : user) : boolean{
    // check null and undefind values if it exists or no
    if(!client.name || !client.email || !client.password ){
        return false
    }
    // check the length if it valide
    if(client.name.length < 2 || client.password.length < 8 || client.email.length < 6){
        return false
    }
return true;
}