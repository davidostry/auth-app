import jwt from 'jsonwebtoken';

export async function createToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET)
}

export async function verifyToken(token){
    return jwt.verifyt(token, process.env.JWT_SECRET)
}