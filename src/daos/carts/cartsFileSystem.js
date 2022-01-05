import fs from 'fs';
import FileContainer from "../../contenedores/fileContainer.js";

export default class CartsFileSystem extends FileContainer {
    constructor(){
        super('cart.txt')
    }
    async createCart(cart) {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let carts = JSON.parse(data);
            let id = carts[carts.length - 1].id + 1;
            let timestamp = Date.now();
            let hour = new Date(timestamp);
            let dataObj = {
                id: id,
                timestamp: hour.toUTCString(),
                productos: []
            };
            carts.push(dataObj)
            if (cart === dataObj){
                dataObj = {
                    id: id,
                    timestamp: hour.toUTCString(),
                    productos: []
                };
            }
            try {
                await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2));
                return {
                    status: "success",
                    message: "Carrito creado"
                }
            } catch (error) {
                return {
                    status: "error",
                    message: "No se pudo registrar el carrito" + error
                }
            }
        } catch {
            let timestamp = Date.now();
            let hour = new Date(timestamp);
            cart = Object.assign({
                id: 1,
                timestamp: hour.toUTCString(),
                productos: []
            }, cart)
            try {
                await fs.promises.writeFile(this.url, JSON.stringify([cart], null, 2));
                return {
                    status: "success",
                    message: "Carrito registrado"
                }
            } catch (error) {
                return {
                    status: "error",
                    message: "No se pudo registrar el carrito" + error
                }
            }
        }
    }
    
    async addProdToCart(idProd, idCart){
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let carts = JSON.parse(data);
            let car = await cartConteiner.cartById(idCart);
            if(car.productos.some(p => p.id === idProd.id) ) {
                return {status:"error",message:"El producto ya existe"}
            } else {
                let product = (await contenedor.getById(idProd.id)).payload;
                let car = await cartConteiner.cartById(idCart);
                car.productos.push(product)
                console.log(car.productos)
                let productoID =  car.productos.filter(p => p.id === product.id);
                let newCart = carts.map((cart)=>{
                        if(cart.id === idCart){
                            return car
                        } else {
                            return cart
                        }
                    })
                    try {
                        await fs.promises.writeFile(this.url, JSON.stringify(newCart, null, 2))
                        return {
                            status: "success",
                            message: "Producto agregado al carrito"
                        }
                    } catch (error) {
                        return {
                            status: "error",
                            message: "No se pudo agregar el producto al carrito" + error
                        }
                }   
            }   
        } catch (error) {
            return {
                status: "error",
                message: "No se pudo encontrar el producto" + error
            }
        }
    }

    async getProdbyCart(id){
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(c => c.id === id);
            return cart.productos
        } catch (error) {
            return {
                status: "error",
                message: "No se pudo encontrar el producto" +error
            }
        }
    }

    async deleteProdForCart(cartId, prodId){
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(c => c.id === cartId);
            let cartIndex = carts.findIndex(c => c.id === cartId);
            let productIndex = cart.productos.findIndex(p => p.id === prodId);
            if( productIndex > -1){
                cart.productos.splice(productIndex, 1)
                carts.splice(cartIndex, 1, cart)
                try {
                    await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2))
                    return {
                        status: "success",
                        message: "Producto eliminado del carrito"
                    }
                } catch (error) {
                    return {
                        status: "error",
                        message: "no se puedo eliminar el producto" +error
                    }
                }
            }
        } catch (error) {
            return {
                status: "error",
                message: "no se puedo eliminar el producto" +error
            }
        }
    }

}