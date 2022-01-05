import Schema from "mongoose";
import MongoContainer from "../../contenedores/mongoContainer.js";

export default class CartsMongo extends MongoContainer {
    constructor(){
        super('carts',
            {
                products:{
                    type:[{
                        type:Schema.Types.ObjectId,
                        ref:'products'
                    }],
                    default:[]
                }
            },{timestamps:true}
        )
    }

    createCart = async (cart) => {
        try {
            let documents = await this.collection.insertMany(cart);
            return {status:"success",message:"carrito creado",paylaod:documents}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    addProdToCart = async (idProd,idCart) => {
        try {
            let document = await this.collection.updateOne({_id:idCart},{$push:{products:idProd}})
            return {status:"success",message:"producto añadido al carrito",paylaod:document}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    getProdByCart = async (id) => {
        try {
            let document = await this.collection.find({"_id":id}).populate('products')
            return {status:"success",paylaod:document}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    deleteProdByCart = async (idProd,idCart) => {
        try {
            let document = await this.collection.updateOne({_id:idCart},{$pull:{products:idProd}})
            return {status:"success",message:"producto eliminado del carrito",paylaod:document}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }
}