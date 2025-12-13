import jwt, { Secret } from 'jsonwebtoken';

const secret=  process.env.JWT_TOKEN;

export function authenticateToken(req: any, res : any, next: any){
    try{
        const token = res?.headers?.['authorization']?.split(" ")[1];
    if(!token){
         return res.status(401).json({statsu :'unauthroized' , error : 'Please provide valid token'});
    }
    jwt.verify(token, secret as Secret , (err : any, user: any)=>{
        if(err){
            return res.status(403).json({error : 'Invalid Token'});
        }
        next();
    })
    }catch(err){
        console.log('Error validating token', {err});
        return res.statsu(500).json({error : 'Unauthorized user'});
    }

}