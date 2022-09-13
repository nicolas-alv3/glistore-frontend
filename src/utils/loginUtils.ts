export function isAdminLogged(): boolean {
   return true
}

export function login(password: string): Promise<string> {
    return new Promise( (resolve, reject) => {
        if( window ) {
            resolve("ok")
        }
        reject("Invalid password")
    })
}