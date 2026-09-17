import { createUser, findUser } from '../DAL/users.js';
import { passwordHash } from '../services/passord.js';

export async function register(req, res) {
    try {
        const { userName, email, password } = req.body
        const existUser = await findUser(email);
        if (existUser) return res.status(409).json({ message: "user already exist" });
        const hash = await passwordHash(password);
        await createUser(userName, email, hash);
        res.status(201).json({ message: "user registered successfully" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "failed to regisrer" })


    }
}