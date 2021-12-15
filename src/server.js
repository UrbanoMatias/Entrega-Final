import express from 'express';
import upload from './services/uploader.js';
import prodRouter from './routes/products.js';
import cartRouter from './routes/cart.js'
import __dirname from './utils.js';


const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>{
    console.log("Servidor escuchando en: ",PORT);
});

const admin = true;

app.use((req,res,next)=>{
    req.auth = admin;
    next();
})
app.use(upload.single('file'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/products',prodRouter);
app.use('/api/carts',cartRouter);


app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const files = req.files;
    if(!files||files.length===0){
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files);
});




