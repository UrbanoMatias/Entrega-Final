import FirebaseContainer from "../../contenedores/firebaseContainer.js";

export default class ProductsFirebase extends FirebaseContainer {
    constructor(){
        super('products')
    }

    createProduct = async (product) => {
        try {
            let data = await this.collection.get();
            let dataObject = data.docs;
            let objects = dataObject.map(document=>document.data())
            if(objects.some(n => n.name === product.name)){
                return {status:"error",message:"Ya existe un producto con ese nombre"}
            }else if (find.some(c => c.code === product.code)){
                return {status:"error",message:"El codigo del producto ya existe"}
            }else {
                let doc = this.collection.doc();
                await doc.set(product)
                return {status:"success",message:"producto creado",payload:doc}
            }
        } catch (error) {
            return {status:"error",message:"error" + error}
        }
    }

}