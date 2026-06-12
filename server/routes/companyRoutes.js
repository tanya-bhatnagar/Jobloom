import express from 'express'
import { ChangeJobApplicationsStatus, changeVisibility, getComapanyData, getComapanyPostedJobs, getCompanyJobApplictions, loginComapany, postJob, registerComapany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'

const router = express.Router()

//Register a company 
router.post('/register',upload.single('image'), registerComapany)

//company login
router.post('/login',loginComapany)

//get company data 
router.get('/company',protectCompany, getComapanyData)

//post a job
router.post('/post-job',protectCompany, postJob)

//get apllicants data of comapny
router.get('/applicants',protectCompany, getCompanyJobApplictions)

//get company job list 
router.get('/list-jobs',protectCompany, getComapanyPostedJobs)

//change applications status
router.post('/change-status',protectCompany, ChangeJobApplicationsStatus)

//change application visibility
router.post('/change-visibility',protectCompany, changeVisibility)

export default router