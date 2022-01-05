import MongoContainer from "../../contenedores/mongoContainer.js"

export default class ProductsMongo extends MongoContainer{
    constructor(){
        super(
            'products',
            {
                name:{type:String, required:true},
                timestamp:{type:String, requiered:true},
                description:{type:String, requiered:true},
                code:{type:String, requiered:true},
                img:{type:String, requiered:true},
                price:{type:Number, requiered:true},
                stock:{type:Number, requiered:true}
            },{timestamps:true}
        )
    }

    createObject = async (object) => {
        try {
            let find = await this.collection.find()
            if (find.some(n => n.name === object.name)){
                return {status:"error",message:"Ya existe un producto con ese nombre"}
            }else if (find.some(c => c.code === object.code)){
                return {status:"error",message:"El codigo del producto ya existe"}
            }else{
                let documents = await this.collection.insertMany(object);
                return {status:"success",message:"producto creado",paylaod:documents}
            }
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    updateProduct = async (id,body) => {
        try {
            let document = await this.collection.updateOne({"_id":id},body)
            console.log(document)
            return {status:"success",message:"producto actualizado",paylaod:document}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }
}