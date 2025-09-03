import express from 'express'
import { ChangeJobApplicationsStatus, changeVisibility, getComapanyData, getComapanyPostedJobs, getCompanyJobApplictions, loginComapany, postJob, registerComapany } from '../controllers/companyController.js'
import upload from '../config/multer.js'

const router = express.Router()

//Register a company 
router.post('/register',upload.single('image'), registerComapany)

//company login
router.post('/login',loginComapany)

//get company data 
router.get('/company',getComapanyData)

//post a job
router.post('/post-job',postJob)

//get apllicants data of comapny
router.get('/applicants',getCompanyJobApplictions)

//get company job list 
router.get('/list-jobs',getComapanyPostedJobs)

//change applications status
router.post('/change-status',ChangeJobApplicationsStatus)

//change application visibility
router.post('/change-visibility',changeVisibility)

export default router