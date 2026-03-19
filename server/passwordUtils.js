import crypto from 'crypto'

export const genPassword =(password)=>{
    const salt = crypto.randomBytes(32).toString('hex')
    const genHash = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')
    return {
        salt:salt,
        hash:genHash
    };

};

export const validPassword = (password,hash,salt)=>{
    const verifyHash = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')
    return verifyHash===hash
}
