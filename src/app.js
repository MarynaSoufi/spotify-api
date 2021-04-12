/**
 * imports
 */
import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authenticate from './auth/index.js';
import middleware from './middleware/auth.js';
import { api } from './api/routers/index.js';
//init dotenv 
dotenv.config();
//create a new express application
const app = Express();

const NODE_ENV = process.env.NODE_ENV;

//add json body-parser 
app.use(bodyParser.json());
app.use("/api", cors(), middleware, api);
// register auth endpoints
app.use("/auth", authenticate);

//open the application

if(NODE_ENV !== 'test'){
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`);
  })
  console.log('Starting the server...');
}


export { app };
