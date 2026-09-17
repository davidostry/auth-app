import { createUser, findUser } from '../DAL/users.js';
import { compareHash, passwordHash } from '../services/passord.js';
import { createToken } from '../services/token.js';

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

export async function login(req, res) {
    try {

        const { email, password } = req.body;
        const exist = await findUser(email);
        if (!exist) res.status(404).json({ message: "user not found" });
        const check = await compareHash(password, exist.hash);
        if (!check) res.status(401).json({ message: "userName or password incorrect" });
        const token = await createToken(exist._id);
        res.json(token);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "failed to regisrer" });

    }

}