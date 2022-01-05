import fs from 'fs';
import FileContainer from "../../contenedores/fileContainer.js";

export default class productsFileSystem extends FileContainer {
    constructor(){
        super('products.txt')
    }
    
    async createProduct(product) {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let products = JSON.parse(data);
            if (products.some(p => p.name === product.name)){
                return {status:"error",message:"El producto ya existe"}
            } else if (products.some(p => p.code === product.code)){
                    return {status:"error",message:"El codigo del producto ya existe"}
                } else {
                        let id = products[products.length - 1].id + 1;
                        let timestamp = Date.now();
                        let hour = new Date(timestamp);
                        product = Object.assign({
                            id: id,
                            timestamp: hour.toUTCString()
                        }, product);
                        products.push(product);
                        try {
                            await fs.promises.writeFile(this.url, JSON.stringify(products, null, 2));
                            return {
                                status: "success",
                                message: "Producto registrado"
                            }
                        } catch (error) {
                            return {
                                status: "error",
                                message: "No se pudo registrar el producto" + error
                            }
                        }
                    } 
        } catch {
            let timestamp = Date.now();
            let hour = new Date(timestamp);
            product = Object.assign({
                id: 1,
                timestamp: hour.toUTCString()
            }, product)
            try {
                await fs.promises.writeFile(this.url, JSON.stringify([product], null, 2));
                return {
                    status: "success",
                    message: "Producto registrado"
                }
            } catch (error) {
                return {
                    status: "error",
                    message: "No se pudo registrar el producto" + error
                }
            }
        }
    }
    async updateProduct(id,body){
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let products = JSON.parse(data);
            if(!products.some(prod=>prod.id===id)) return {status:"error", message:"No hay ningún producto con el id especificado"}
            let update = products.map(prod=>{
                if(prod.id===id){
                    return body = Object.assign({id:prod.id,...body})
                }else{
                    return prod;
                }
            })
            try {
                await fs.promises.writeFile(this.url,JSON.stringify(update,null,2))
                return {
                    status: "success",
                    message: "Producto actualizado"
                }
            } catch (error) {
                return {status:"error",message:"Fallo al actualizar el usuario" +error}
            }
        } catch (error) {
            return {status:"error",message:"Fallo al actualizar el producto" +error}
        }
    }
}