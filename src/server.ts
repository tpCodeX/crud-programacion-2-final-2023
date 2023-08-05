import express from 'express';
import categoriesRouter from './routes/categories.routes'
import usersRouter from './routes/users.routes'
import productsRouter from './routes/products.routes'
import path from 'path';
import cookieParser from 'cookie-parser'
import { authRequired } from './middlewares/validateToken';
import morgan from 'morgan'



const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


export const viewsPath=path.join(__dirname,"..","views")

app.use(express.static("public"));
app.set("view engine","ejs");
app.set('views',viewsPath)


app.use("/categorias",authRequired,categoriesRouter)
app.use("/productos",authRequired,productsRouter)
app.use("/users", usersRouter)

const PORT=3000;

app.get('/', (_req, res) => {
    res.render("./index.ejs")
})



app.listen(PORT,()=>{
    console.log(`    
    La aplicación ha sido levantada con éxito. ✅
    Server 👂 en el puerto ${PORT}.
    🌐 >> http://localhost:${PORT}/ << 🌐`
    );});