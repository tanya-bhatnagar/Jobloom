import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectionDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks} from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudnary.js'
import JobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'
import aiRoutes from './routes/aiRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

//Initialize Express 
const app = express()

//Connect to database
await connectionDB()
await connectCloudinary()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

//Routes
app.get('/',(req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',JobRoutes)
app.use('/api/users',userRoutes)
app.use("/api/ai", aiRoutes);
app.use('/api/resume', resumeRoutes);



console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);


//Port
const PORT = process.env.PORT || 8080

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}`);
})

