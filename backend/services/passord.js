import bcrypt from 'bcrypt';

export async function passwordHash(password){
    return bcrypt.hash(password, 10)
}

export async function compareHash(plaintPassword, hash){
    return bcrypt.compare(plaintPassword, hash)
}