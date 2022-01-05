import admin from 'firebase-admin'
import config from '../config.js'

admin.initializeApp({
    credential:admin.credential.cert(config.firebase),
    databaseURL:"https://e-commerce-1a62f.firebaseio.com"
})
const db = admin.firestore();

export default class FirebaseContainer {
    constructor(collection) {
        this.collection = db.collection(collection)
    }

    getAll = async () => {
        try {
            let data = await this.collection.get();
            let dataObject = data.docs;
            let objects = dataObject.map(document=>document.data())
            return {status:"success",paylaod:objects}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    getById = async (id) => {
        try {
            let data = await this.collection.get();
            let dataObject = data.docs;
            let objects = dataObject.map(document=>document.data())
            let ObjId = objects.find(i => i.id === id.id)
            return {status:"success",paylaod:ObjId}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    deleteById = async (id) => {
        try {
            let doc = this.collection.doc(id);
            await doc.delete()
            return {status:"success",message:"documento eliminado",paylaod:doc}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    updateObject = async (id,body) => {
        try {
            let doc = this.collection.doc(id);
            await doc.update(body)
            return {status:"success",message:"documento actualizado",paylaod:doc}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }
}