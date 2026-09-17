import express from 'express';
import dotenv from "dotenv"
import cors from "cors";
import router from './routes/router.js'
import { logger } from './middleware/basic.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000
const app = express()


app.use(logger)
app.use(cors())
app.use(express.json())

app.use("/", router)



app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}` );
    
})