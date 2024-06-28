import express,{Application, NextFunction} from "express";
import databaseConfg from "./configs/db.config";
import expressConfig from "./configs/express.config";
import serverConfig from "./configs/server.config";
import { createServer } from 'http';
import routesConfig from "./routes/routes";



const app: Application = express();
const httpServer = createServer(app);

// database config
databaseConfg()  

//express config 
expressConfig(app);

//server config 
serverConfig(httpServer)

//routes config
routesConfig(app)