import FirebaseContainer from "../../contenedores/firebaseContainer.js";

export default class CartsFirebase extends FirebaseContainer {
    constructor(){
        super('carts')
    }

    createCart = async (cart) => {
        try {
            let doc = this.collection.doc();
            await doc.set(cart)
            let car = {
                products: []
            }
            
            if(cart === car){
                car = {
                    products: []
                }
            }
            return {status:"success",message:"carrito creado",payload:doc}
        } catch (error) {
            return {status:"error",message:"error" + error}
        }
    }

    addProdToCart = async (cartId,prodId) => {
        try {
            let data = await this.collection.doc(cartId).get();
            let objects = data.data();
            objects.products.push(prodId);
            let add = await this.collection.doc(cartId).update(objects)
            return {status:"success",message:"producto añadido al carrito",payload:add}
        } catch (error) {
            return {status:"error",message:"error" + error}
        }
    }

    getProdByCart = async (idCart) => {
        try {
            let data = await this.collection.doc(idCart).get();
            let objects = data.data();
            return {status:"success",message:"producto eliminado del carrito",paylaod:objects.products}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }

    deleteProdByCart = async (idProd,idCart) => {
        try {
            let carts = await this.collection.doc(idCart).get();
            let objects = carts.data();
            let array = objects.products;
            objects = array.filter(p => p.id != idProd);
            const data = {objects};
            const newCart = await this.collection.doc(idCart).set(data);
            return {status:"success",message:"producto eliminado del carrito",paylaod:newCart}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }
}