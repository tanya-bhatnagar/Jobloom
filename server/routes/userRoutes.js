import express from 'express'
import { applyForjob, getUserData, getUserJobApplications, updateUserResume, createOrGetUser } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const router = express.Router()

//Get user Data
router.get('/user',ClerkExpressRequireAuth({}),getUserData)

//Apply for a job
router.post('/apply',ClerkExpressRequireAuth({}),applyForjob)

//Get applied jobs data
router.get('/applications',ClerkExpressRequireAuth({}),getUserJobApplications)

//Update user profile (resume)
router.post('/update-resume',ClerkExpressRequireAuth({}),upload.single('resume'),updateUserResume)

// routes file mein ye line add karo
router.post('/create-or-get-user', ClerkExpressRequireAuth({}),createOrGetUser)


export default router