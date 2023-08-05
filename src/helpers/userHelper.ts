import bcrypt from 'bcryptjs'
import IUser from '../Interfaces/IUser';
import { prisma } from '../dbClient';
import SECRET from '../config';
import jwt from 'jsonwebtoken';
import ITokenData from '../Interfaces/ITokenData';

class UserHelper{
    async hashPassword(pass:string){
         return await bcrypt.hash(pass,10)
     };

     async comparePassword(password:string,hashedPass:string){
        return await bcrypt.compare(password,hashedPass)
     }

     async usuarioExiste({userName,email}:IUser){
        // try{
            const userByName= await prisma.user.findFirst({
                where:{
                    userName: userName
                }
            });
            const userByMail= await prisma.user.findFirst({
                where:{
                    email:email
                }
            })

            const nameExiste= userByName? true:false
            const mailExiste= userByMail? true:false

            return{nameExiste,mailExiste}
            
        // }catch(err){
        //     throw new Error("Usuario no verificado.")
        // }
    }

    async giveToken(user:ITokenData){
        if(!user) throw new Error("No se recibe la data")
        const secret=SECRET
        const token = jwt.sign(user,secret);
        const loggedUser:ITokenData ={
            id:user.id,
            email:user.email,
            role:user.role,
            token
        }
        return loggedUser
    }

    async verifyToken(token:string){
        try{
            return jwt.verify(token,SECRET);
        }catch(err:any){
            return null;
        }
    }
    
}


export default UserHelper