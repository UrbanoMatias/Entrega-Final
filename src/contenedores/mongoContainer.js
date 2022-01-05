import mongoose from 'mongoose'
import config from '../config.js'

mongoose.connect(config.mongo.baseUrl,{useNewUrlParser:true,useUnifiedTopology:true})

export default class MongoContainer{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection, new mongoose.Schema(schema,timestamps))
    }

    getAll = async () => {
        try {
            let documents = await this.collection.find()
            return {status:"success",paylaod:documents}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    getById = async (id) => {
        try {
            let find = await this.collection.find({"_id":id})
            return {status:"success",paylaod:find}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    deleteById = async (id) => {
        try {
            let document = await this.collection.deleteOne({"_id":id})
            return {status:"success",message:"documento eliminado",paylaod:document}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }
}