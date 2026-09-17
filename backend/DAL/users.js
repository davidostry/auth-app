import { db } from '../DB/config.js'

const users = db.collection("users");

export async function createUser(userName, email, hash) {

  const { insertedId } = await users.insertOne({ userName, email, hash })
  return insertedId
}

export async function findUser(email) {
  const correctedEmail = email.toLowerCase();
  const user = await users.findOne({ email: correctedEmail });
  return user;
}

export async function getAll() {
  return await users.find().toArray()
}