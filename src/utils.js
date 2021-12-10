import {fileURLToPath} from 'url';
import {dirname} from 'path';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authMiddleware = (req,res,next)=>{
    if(!req.auth) res.status(403).send({error:-2,message:"NO TIENES AUROTIZACION PARA ACCEDER A ESTA PAGINA"})
    else next();
}

export default __dirname;