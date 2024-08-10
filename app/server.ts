import express,{ Application, application } from "express";
import  sequelize from "./config/db";
import { config } from "dotenv";
import mainRouter from "./routes/mainRouter";

config()

const PORT: number| string = process.env.PORT || 3001;
const app:Application = express()

app.use(express.json());
app.use("/api",mainRouter);

const startApp = async (): Promise<void> =>{
    try {
        await sequelize.authenticate();
        console.log("Database connected");
        await sequelize.sync({force:true});//acualizar automaticamente al cambiar tablas
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    }catch(err){
        console.error("There's an error trying to connect to the database");
        
    }
}

startApp()