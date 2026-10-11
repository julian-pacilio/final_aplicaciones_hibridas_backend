import { ObjectId } from "mongodb";
import { db, client } from "../services/mongo.js";
const JudgesCollection = db.collection("judges");

/**
 * Obtiene todos los documentos de la colección "judges"
 *
 * @returns {Promise<Array>} Array de jueces
 */
async function getAllJudges() {
  await client.connect();
  return JudgesCollection.find({}).toArray();
}

/**
 * Obtiene la información de un juez por su ID.
 * @param {string} id - ID del juez.
 * @returns {Promise} Juez.
 */
async function getJudgeById(id) {
  await client.connect();
  return JudgesCollection.findOne({ _id: new ObjectId(id) });
}

export default {
    getJudgeById,
    getAllJudges
};
