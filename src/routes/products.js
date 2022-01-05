import express from 'express';
import Contenedor from '../contenedores/Contenedor.js';
import { authMiddleware } from '../utils.js';
const contenedor = new Contenedor();
import {products} from '../daos/index.js'
const router = express.Router();



//GETS
router.get('/',(req,res)=>{
    console.log(req.query)
    products.getAll().then(result=>{
        res.send(result);
    })
})

router.get('/:uid',(req,res)=>{
    let id = req.params.uid;
    products.getById(id).then(result=>{
        res.send(result);
    })
})

//POST
// router.post('/',authMiddleware,(req,res)=>{
//     let object = req.body;
//     products.createObject(object).then(result=>{
//         res.send(result)
//     })
// })


router.post('/',authMiddleware,(req,res)=>{
    let product = req.body;
    products.createProduct(product).then(result=>{
        res.send(result)
    })
})

//PUT
router.put('/:uid',(req,res)=>{
    let id = req.params.uid;
    let body = req.body
    products.updateObject(id,body).then(result=>{
        res.send(result);
    })
})

//DELETE
router.delete('/:pid',authMiddleware,(req,res)=>{
    let id = req.params.pid;
    products.deleteById(id).then(result=>{
        res.send(result);
    })
})

export default router