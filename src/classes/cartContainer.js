import { deepStrictEqual } from 'assert';
import fs from 'fs'
import __dirname from '../utils.js';
import Contenedor from './Contenedor.js';
const contenedor = new Contenedor();
const cartURL = __dirname+'/files/cart.txt';
const prodURL = __dirname+'/files/products.txt';

class CartConteiner {
    
    async createCart(cart) {
        try {
            let data = await fs.promises.readFile(cartURL, 'utf-8');
            let carts = JSON.parse(data);
            let id = carts[carts.length - 1].id + 1;
            let timestamp = Date.now();
            let hour = new Date(timestamp);
            cart = Object.assign({
                id: id,
                timestamp: hour.toUTCString(),
                productos: []
            }, cart);
            carts.push(cart)
            try {
                await fs.promises.writeFile(cartURL, JSON.stringify(carts, null, 2));
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
                await fs.promises.writeFile(cartURL, JSON.stringify([cart], null, 2));
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
    async cartById(id) {
        try {
            let data = await fs.promises.readFile(cartURL, 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(c => c.id === id)
            return cart
        } catch {
            return {
                status: "error",
                message: "Error al obtener el producto"
            }
        }
    }
    async addProdToCart(idProd, idCart){
        try {
            let data = await fs.promises.readFile(cartURL, 'utf-8');
            let carts = JSON.parse(data);
            let product = (await contenedor.getById(idProd.id)).payload;
            console.log(product)
            let car = await cartConteiner.cartById(idCart);
            car.productos.push(product)
            let newCart = carts.map((cart)=>{
                if(cart.id === idCart){
                    return car
                } else {
                    return cart
                }
            })
            console.log(car)
            
            try {
                await fs.promises.writeFile(cartURL, JSON.stringify(newCart, null, 2))
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
        } catch (error) {
            return {
                status: "error",
                message: "No se pudo encontrar el producto" + error
            }
        }
    }
    async getProdbyCart(id){
        try {
            let data = await fs.promises.readFile(cartURL, 'utf-8');
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
    async deleteCart(id){
        try {
            let data = await fs.promises.readFile(cartURL, 'utf-8');
            let carts = JSON.parse(data);
            let newCart = carts.filter(car => {
                return car.id != id;
            });
            try {
                await fs.promises.writeFile(cartURL, JSON.stringify(newCart, null, 2));
                return {
                    status: "success",
                    message: "Carrito eliminado"
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
    async deleteProdForCart(cartId, prodId){
        try {
            let data = await fs.promises.readFile(cartURL, 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(c => c.id === cartId);
            let cartIndex = carts.findIndex(c => c.id === cartId);
            let productIndex = cart.productos.findIndex(p => p.id === prodId);
            if( productIndex > -1){
                cart.productos.splice(productIndex, 1)
                carts.splice(cartIndex, 1, cart)
                try {
                    await fs.promises.writeFile(cartURL, JSON.stringify(carts, null, 2))
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

export default CartConteiner;

const cartConteiner = new CartConteiner();