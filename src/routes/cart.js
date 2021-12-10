import express from 'express';
import CartConteiner from '../classes/cartContainer.js';
const cartConteiner = new CartConteiner();
const router = express.Router();

//GET
router.get('/:cid/products',(req,res)=>{
    let id = req.params.cid;
    id = parseInt(id);
    cartConteiner.getProdbyCart(id).then(result=>{
        res.send(result)
    })
})

//POST
router.post('/',(req,res)=>{
    let cart = req.body;
    cartConteiner.createCart(cart).then(result=>{
        res.send(result)
    })
})

router.post('/:cid/products',(req,res)=>{
    let idCart = req.params.cid;
    idCart = parseInt(idCart);
    let idProd = req.body
    cartConteiner.addProdToCart(idProd, idCart).then(result=>{
        res.send(result)
    })

})


//DELETE
router.delete('/:cid',(req,res)=>{
    let id = req.params.cid;
    id = parseInt(id);
    cartConteiner.deleteCart(id).then(result=>{
        res.send(result);
    })
})

router.delete('/:cid/products/:pid',(req,res)=>{
    let cartId = req.params.cid;
    cartId = parseInt(cartId);
    let prodId = req.params.pid;
    prodId = parseInt(prodId);
    cartConteiner.deleteProdForCart(cartId, prodId).then(result=>{
        res.send(result)
    })
    })

export default router