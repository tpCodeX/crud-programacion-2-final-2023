import {z} from 'zod'

export const userRegisterSchema=z.object({

    email:z.string({
        required_error:"El email es requerido.",
    }).email({
        message:"El email es invalido."
    }),


    userName:z.string({
        required_error:"El nombre de usuario es requerido."
    }),

    password:z.string({
        required_error:"La contraseña es requerida"
    }).min(8,{message:"La contraseña debe tener al menos 8 caracteres."}).max(12,{message:"La contraseña puede contener hasta 12 caracteres."})

});

export const userLoginSchema=z.object({
    email:z.string({
        required_error:"El email es requerido.",
    }).email({
        message:"El email es invalido."
    }),
    password:z.string({
        required_error:"La contraseña es requerida"
    }).min(8,{message:"La contraseña debe tener al menos 8 caracteres."}).max(12,{message:"La contraseña puede contener hasta 12 caracteres."})
})
