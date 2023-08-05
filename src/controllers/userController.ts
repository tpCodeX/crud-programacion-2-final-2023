import ITokenData from "../Interfaces/ITokenData";
import IUser from "../Interfaces/IUser";
import UserHelper from "../helpers/userHelper";
// import { prisma } from "../dbClient";
import UserServices from "../services/userServices";
import { Request, Response } from "express";

class UserController {
  helper: UserHelper;
  services: UserServices;
  constructor() {
    this.services = new UserServices();
    this.helper = new UserHelper();
  }

  async getPerfil(req: Request, res: Response){
    const {id}=req.body.isVerificado
    try{
      const user= await this.services.getUserById(id);
      const users:IUser[]=[user]
      res.render("./usuarios/list.ejs",{users});
    }catch(err:any){
      res.render("./usuarios/message.ejs",{message:err.message});
    }
  }

  async handleGetUsers(req:Request,res:Response){
    console.log(req.body.isVerificado);
    try{
        const users:IUser[]= await this.services.getUsers();
        res.render('./usuarios/list.ejs',{users});
    }catch(err:any){
        res.render("./usuarios/message.ejs",{message:err.message});
    }
  }

  async handleGetUsersByID(req:Request,res:Response){
    try{
        const user:IUser=await this.services.getUserById(+req.params.id);
        const users:IUser[]=[user];
        res.render("./usuarios/list.ejs",{users});
    }catch(err:any){
        res.render("./usuarios/message.ejs",{message:err.message});
    }
  };

  async handleRegisterUser(req:Request,res:Response){
    const data:IUser=req.body
    try{
      const newUser=await this.services.registerUser(data);
      const toTokenize:ITokenData={
        id:newUser.id,
        email:newUser.email,
        role:newUser.role
      }
      const tokenized=await this.helper.giveToken(toTokenize);
      const token=tokenized.token
        res.cookie("token",token)
        res.render('./usuarios/message',{message:`${newUser.userName} ha sido registrado exitosamente con el e-mail ${newUser.email}.`});
        
    }catch(err:any){
        res.render('./usuarios/message',{message:err.message});
    }
  }

  async handleLoginUser(req: Request, res: Response){
    const{email,password}=req.body;
    const mailValid=this.services.validarMail(email);
    const passValid=this.services.validarPass(password);
    
    if (passValid===false){
      res.render("./usuarios/message.ejs",{message: "Falta la contraseña."}); 
    }
    if (mailValid===false){
      res.render("./usuarios/message.ejs",{message: "Falta el mail."});
    }
    try{
      const authorizedUser:ITokenData= await this.services.loginUser(email,password);
      res.cookie("token",authorizedUser.token);
      res.send(authorizedUser)
      // res.render("./usuarios/message.ejs",{message: `auth: ${authorization}`});
    }catch(err:any){
      res.render("./usuarios/message.ejs",{message:err.message});
    }
  }

  async handleLogOut(_req: Request, res: Response){
    res.cookie("token","nada",{expires:new Date(0)})
    console.log("sesion cerrada")
    res.redirect("http://localhost:3000/")

  }



}

export default UserController;
