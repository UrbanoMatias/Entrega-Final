import express from 'express';
import Contenedor from '../classes/Contenedor.js';
import { authMiddleware } from '../utils.js';
const contenedor = new Contenedor();
const router = express.Router();



//GETS
router.get('/',(req,res)=>{
    console.log(req.query)
    contenedor.getAll().then(result=>{
        res.send(result);
    })
})

router.get('/:uid',(req,res)=>{
    let id = req.params.uid;
    id = parseInt(id);
    contenedor.getById(id).then(result=>{
        res.send(result);
    })
})

//POST
router.post('/',authMiddleware,(req,res)=>{
    let product = req.body;
    contenedor.createProduct(product).then(result=>{
        res.send(result)
    })
})


//PUT
router.put('/:uid',authMiddleware,(req,res)=>{
    let id = parseInt(req.params.uid);
    let body = req.body
    contenedor.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETE
router.delete('/:pid',authMiddleware,(req,res)=>{
    let id = req.params.pid;
    id = parseInt(id);
    contenedor.deleteById(id).then(result=>{
        res.send(result);
    })
})

export default router