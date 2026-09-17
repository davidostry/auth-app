import { createUser, findUserByEmail, findUserById } from '../DAL/users.js';
import { compareHash, passwordHash } from '../services/passord.js';
import { createToken } from '../services/token.js';

export async function register(req, res) {
    try {
        const { userName, email, password } = req.body;

        const existUser = await findUserByEmail(email);

        if (existUser) {
            return res.status(409).json({
                message: "user already exist"
            });
        }

        const hash = await passwordHash(password);

        await createUser(userName, email, hash);

        res.status(201).json({
            message: "user registered successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to register"
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const exist = await findUserByEmail(email);

        if (!exist) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        const check = await compareHash(password, exist.hash);

        if (!check) {
            return res.status(401).json({
                message: "username or password incorrect"
            });
        }

        const token = await createToken(exist._id);

        res.json({
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to login"
        });
    }
}

export async function getDetails(req, res) {
    try {
        
        console.log("USER FROM AUTH:", req.user);

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        res.json({
            _id: user._id,
            userName: user.userName,
            email: user.email
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get user details"
        });
    }
}