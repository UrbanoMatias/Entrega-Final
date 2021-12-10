import fs from 'fs'
import __dirname from '../utils.js';
const prodURL = __dirname+'/files/products.txt';


class Contenedor {
    async createProduct(product) {
        try {
            let data = await fs.promises.readFile(prodURL, 'utf-8');
            let products = JSON.parse(data);
            let id = products[products.length - 1].id + 1;
            let timestamp = Date.now();
            let hour = new Date(timestamp);
            product = Object.assign({
                id: id,
                timestamp: hour.toUTCString()
            }, product);
            products.push(product)
            try {
                await fs.promises.writeFile(prodURL, JSON.stringify(products, null, 2));
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
        } catch {
            let timestamp = Date.now();
            let hour = new Date(timestamp);
            product = Object.assign({
                id: 1,
                timestamp: hour.toUTCString()
            }, product)
            try {
                await fs.promises.writeFile(prodURL, JSON.stringify([product], null, 2));
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
    async getById(id) {
        try {
            let data = await fs.promises.readFile(prodURL, 'utf-8');
            let products = JSON.parse(data);
            let prod = products.find(v => v.id === id)
            if (prod) {
                console.log(prod)
                return {
                    status: "success",
                    payload: prod
                }
            } else {
                return {
                    status: "error",
                    message: "Producto no encontrado"
                }
            }
        } catch {
            return {
                status: "error",
                message: "Error al obtener el producto"
            }
        }
    }
    async getAll() {
        try {
            let data = await fs.promises.readFile(prodURL, 'utf-8')
            let product = JSON.parse(data);
            return {
                status: "success",
                payload: product
            };
        } catch {
            return {
                status: "error",
                message: "Error al obtener los productos"
            }
        }
    }
    async updateProduct(id,body){
        try {
            let data = await fs.promises.readFile(prodURL, 'utf-8');
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
                await fs.promises.writeFile(prodURL,JSON.stringify(update,null,2))
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
    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(prodURL, 'utf-8');
            let products = JSON.parse(data);
            let newProduct = products.filter(prod => {
                return prod.id != id;
            });
            try {
                await fs.promises.writeFile(prodURL, JSON.stringify(newProduct, null, 2));
                return {
                    status: "success",
                    message: "Producto eliminado"
                }
            } catch (error) {
                return {
                    status: "error",
                    message: "No se pudo encontrar el id" +error
                }
            }
        } catch (error) {
            return {
                status: "error",
                message: "No se pudo encontrar el id" +error
            }
        }
    }
    async deleteAll() {
        try {
            let data = await fs.promises.writeFile(prodURL, [])
            return data
        } catch (error) {
            return {
                status: "error",
                message: "No se pudo borrar el arreglo" +error
            }
        }
    }
    async productRandom(product) {
        try {
            let data = await fs.promises.readFile(prodURL, 'utf-8')
            product = JSON.parse(data);
            let random = Math.floor(Math.random() * product.length)
            return product[random];
        } catch (error) {
            return {
                status: "error",
                message: "No se pudo encontrar el producto" +error
            }
        }
    }
}

export default Contenedor;