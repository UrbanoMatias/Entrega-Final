import express from 'express';
import CartConteiner from '../contenedores/cartContainer.js';
import { carts } from '../daos/index.js';
const router = express.Router();

//GET
router.get('/carrito',(req,res)=>{
    let id = req.body.cid;
    carts.getProdByCart(id).then(result=>{
        res.send(result)
    })
})
router.get('/',(req,res)=>{
    console.log(req.query)
    carts.getAll().then(result=>{
        res.send(result);
    })
})

//POST
router.post('/',(req,res)=>{
    let cart = req.body;
    carts.createCart(cart).then(result=>{
        res.send(result)
    })
})


router.post('/:cid/products',(req,res)=>{
    let cartId = req.params.cid;
    let prodId = req.body
    carts.addProdToCart(cartId,prodId).then(result=>{
        res.send(result)
    })

})

router.post('/agregar',(req,res)=>{
    let idProd = req.body.pid;
    let idCart = req.body.cid;
    carts.addProdToCart(idProd,idCart).then(result=>{
        res.send(result);
    })
})

//PUT
router.put('/:cid/products/:pid',(req,res)=>{
    let idCart = req.params.cid;
    let idProd = req.params.pid;
    carts.deleteProdByCart(idProd,idCart).then(result=>{
        res.send(result)
    })
})

//DELETE
router.delete('/:cid',(req,res)=>{
    let id = req.params.cid;
    carts.deleteById(id).then(result=>{
        res.send(result);
    })
})

router.delete('/:cid/products/:pid',(req,res)=>{
    let idCart = req.params.cid;
    let idProd = req.params.pid;
    carts.deleteProdByCart(idProd,idCart).then(result=>{
        res.send(result)
    })
})

export default router