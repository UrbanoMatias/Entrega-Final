import fs from 'fs';
import config from '../config.js';
export default class FileContainer {
    constructor(file_endpoint){
        this.url = `${config.fileSystem.baseUrl}${file_endpoint}`
    }

    getAll = async () => {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8')
            return { status:"success",payload:JSON.parse(data)}
        } catch (error) {
            return {status:"error",message:"error" + error}
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let object = JSON.parse(data);
            let obj = object.find(o => o.id === id)
            if (obj) {
                return {
                    status: "success",
                    payload: obj
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

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let object = JSON.parse(data);
            let newObject = object.filter(obj => {
                return obj.id != id;
            });
            try {
                await fs.promises.writeFile(this.url, JSON.stringify(newObject, null, 2));
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
            let data = await fs.promises.writeFile(this.url, [])
            return data
        } catch (error) {
            return {
                status: "error",
                message: "No se pudo borrar el arreglo" +error
            }
        }
    }
}