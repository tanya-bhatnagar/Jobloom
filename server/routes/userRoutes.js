import express from 'express'
import { applyForjob, getUserData, getUserJobApplications, updateUserResume, createOrGetUser } from '../controllers/userController.js'
import upload from '../config/multer.js'
import {requireAuth } from '@clerk/express';


const router = express.Router()

//Get user Data
router.get('/user', requireAuth(),getUserData)

//Apply for a job
router.post('/apply', requireAuth(),applyForjob)

//Get applied jobs data
router.get('/applications', requireAuth(),getUserJobApplications)

//Update user profile (resume)
router.post('/update-resume', requireAuth(),upload.single('resume'),updateUserResume)

// routes file mein ye line add karo
router.post('/create-or-get-user',  requireAuth(),createOrGetUser)


export default router