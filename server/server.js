// import './config/instrument.js'
// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectionDB from './config/db.js'
// import * as Sentry from "@sentry/node";
// import { clerkWebhooks} from './controllers/webhooks.js'
// import companyRoutes from './routes/companyRoutes.js'
// import connectCloudinary from './config/cloudnary.js'
// import JobRoutes from './routes/jobRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import {clerkMiddleware} from '@clerk/express'
// import aiRoutes from './routes/aiRoutes.js';
// import resumeRoutes from './routes/resumeRoutes.js';


// //Initialize Express 
// const app = express()

// //Connect to database
// await connectionDB()
// await connectCloudinary()

// //Middlewares
// // app.use(cors())
// app.use(cors({
//     credentials: true,
//     origin: true 
// }))
// app.use(express.json())
// app.use(clerkMiddleware())

// //Routes
// app.get('/',(req,res)=>res.send("API Working"))
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });
// app.post('/webhooks',clerkWebhooks)
// app.use('/api/company',companyRoutes)
// app.use('/api/jobs',JobRoutes)
// app.use('/api/users',userRoutes)
// app.use("/api/ai", aiRoutes);
// app.use('/api/resume', resumeRoutes);



// console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);


// //Port
// const PORT = process.env.PORT || 8080

// Sentry.setupExpressErrorHandler(app);

// app.listen(PORT,()=>{
//        console.log(`Server is running on port ${PORT}`);
// })
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

const app = express()

await connectionDB()
await connectCloudinary()

// CORS - origin: true rakhte hain
app.use(cors({
    credentials: true,
    origin: true 
}))
app.use(express.json())

// ✅ PUBLIC ROUTES (Without Clerk Middleware) - PEHLE LIKHO
app.get('/',(req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)
app.use("/api/ai", aiRoutes);  // ✅ AI Routes PUBLIC - No Auth

// ✅ CLERK MIDDLEWARE (Only for protected routes below)
app.use(clerkMiddleware())

// ✅ PROTECTED ROUTES (After Clerk Middleware)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',JobRoutes)
app.use('/api/users',userRoutes)
app.use('/api/resume', resumeRoutes);

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

const PORT = process.env.PORT || 8080

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}`);
})
