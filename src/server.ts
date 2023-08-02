import express from 'express';
import categoriesRouter from './routes/categories.routes'
import usersRouter from './routes/users.routes'
import productsRouter from './routes/products.routes'
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export const viewsPath=path.join(__dirname,"..","views")

app.use(express.static("public"));
app.set("view engine","ejs");
app.set('views',viewsPath)


app.use("/categorias",categoriesRouter)
app.use("/productos",productsRouter)
app.use("/users",usersRouter)

const PORT=3000;

app.get('/', (_req, res) => {
    res.send("ola k ase")
})

app.listen(PORT,()=>{
    console.log(`    
    La aplicación ha sido levantada con éxito. ✅
    Server 👂 en el puerto ${PORT}.
    🌐 >> http://localhost:${PORT}/ << 🌐`
    );});