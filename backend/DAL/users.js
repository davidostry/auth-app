import { ObjectId } from "mongodb";
import { db } from "../DB/config.js";

const users = db.collection("users");

export async function createUser(userName, email, hash) {
    const correctedEmail = email.toLowerCase();

    const { insertedId } = await users.insertOne({
        userName,
        email: correctedEmail,
        hash
    });

    return insertedId;
}

export async function findUserByEmail(email) {
    const correctedEmail = email.toLowerCase();

    const user = await users.findOne({
        email: correctedEmail
    });

    return user;
}

export async function findUserById(id) {
    const user = await users.findOne({
        _id: new ObjectId(id)
    });

    return user;
}