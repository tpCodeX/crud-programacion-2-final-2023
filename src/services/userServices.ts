import ITokenData from "../Interfaces/ITokenData";
import IUser from "../Interfaces/IUser";
import { prisma } from "../dbClient";
import UserHelper from "../helpers/userHelper";

class UserServices {
  public services: UserHelper;
  constructor() {
    this.services = new UserHelper();
  }

  async getUsers() {
    const users: IUser[] = await prisma.user.findMany();
    if (!users) {
      throw new Error("Error 404: Users not found xD");
    }
    return users;
  }

  async getUserById(id: number) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new Error("Error 404: User not found xDD");
    }
    return user;
  }

  async deleteUser(id: number) {
    const deletedUser = await prisma.user.delete({ where: { id: id } });
    return deletedUser;
  }

  async giveRole({ id, role }: IUser) {
    const userExiste = await prisma.user.findFirst({ where: { id: id } });
    if (!userExiste) {
      throw new Error("El usuario no existe.");
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { role: role },
    });
    return updatedUser;
  }

  async registerUser(data: IUser) {
    const comparedData = await this.services.usuarioExiste(data);

    if (comparedData.mailExiste || comparedData.nameExiste) {
      throw new Error("El usuario ya existe xD");
    }
    const hashedPass = await this.services.hashPassword(data.password);
    const toPass = hashedPass.toString();
    const newUser = await prisma.user.create({
      data: {
        email: data.email.toString(),
        userName: data.userName.toString(),
        password: toPass,
      },
    });

    return newUser;
  }

  async updateUser(data: IUser) {
    const userExiste = await prisma.user.findFirst({ where: { id: data.id } });
    if (!userExiste) {
      throw new Error("El usuario no existe.");
    }

    const comparedName =
      userExiste.userName === data.userName
        ? userExiste.userName
        : data.userName;
    const comparedEmail =
      userExiste.email === data.email ? userExiste.email : data.email;
    const toUpdateUser = async () => {
      const comparedPass = await this.services.comparePassword(
        data.password,
        userExiste.password
      );

      if (comparedPass) {
        const updatedUser: IUser = await prisma.user.update({
          where: { id: data.id },
          data: {
            email: comparedEmail,
            userName: comparedName,
          },
        });

        return updatedUser;
      } //cierra if lcdtm

      const newHashedPassword = await this.services.hashPassword(data.password);
      const updatedUser: IUser = await prisma.user.update({
        where: { id: data.id },
        data: {
          email: comparedEmail,
          userName: comparedName,
          password: newHashedPassword,
        },
      });
      return updatedUser;
    };
    toUpdateUser();
  }

  async loginUser(email: string, password: string) {

    const userExist = await prisma.user.findFirst({ where: { email } });
    if (!userExist) {
      throw new Error("El mail ingresado no se encuentra registrado.");
    }
    const passMatch = await this.services.comparePassword(
      password,
      userExist.password
    );
    if (!passMatch) {
      throw new Error("Contraseña Incorrecta.");
    }

    const toAuthorize:ITokenData={
      id:userExist.id,
      email:userExist.email,
      role:userExist.role.toString(),
    }
    const authorizedUser=await this.services.giveToken(toAuthorize)

    return authorizedUser //retorna user con token xd
  }




  validarMail(email:string){
    return !email||email===""? false:true
}
validarPass(pass:string){
    return !pass||pass===""? false:true
}
}

export default UserServices;
