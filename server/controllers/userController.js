import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import {v2 as cloudinary} from 'cloudinary'

export const createOrGetUser = async (req, res) => {
    try {
        const { userId } = req.auth
        
        // Check if user already exists
        let user = await User.findById(userId) 
        
        if (!user) {
            const { name, email, image } = req.body
            
            user = await User.create({
                _id: userId, 
                name: name || 'User',
                email: email,
                image: image || ''
            })
        }
        
        res.json({ success: true, user })
        
    } catch (error) {

        res.json({ success: false, message: error.message })
    }
}

// Get user Data 
export const getUserData = async(req,res)=>{
 
  const { userId } = req.auth

    try {
        
        const user = await User.findById(userId)
        if (!user) {
            return res.json({success:false, message:'User Not Found'})
        }

        res.json({success:true , user})

    } catch (error) {
                res.json({success:false, message:error.message})
        
    }

}

// Apply for a job
export const applyForjob = async(req,res)=>{

    const { jobId } = req.body
   const { userId } = req.auth
    try {

         const user = await User.findById(userId)
        if (!user) {
            return res.json({success:false, message:'User not found. Please create profile first.'})
        }

        const isAlreadyApplied = await JobApplication.find({jobId,userId})

        if (isAlreadyApplied.length > 0) {
            return res.json({success:false, message:'Already Applied'})
        }

        const jobData  = await Job.findById(jobId)

        if (!jobData) {
            return res.json({success:false, message:'Job Not Found'})

        }
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })
        res.json({success:true, message:'Applied Successfully'})

        
    } catch (error) {
        res.json({success:false, message:error.message})
    }

}

//Get user applied applications
export const getUserJobApplications = async(req,res)=>{

    try {

       const { userId } = req.auth
          const user = await User.findById(userId)
        if (!user) {
            return res.json({success:false, message:'User not found'})
        }

        const applications = await JobApplication.find({ userId })
        .populate('companyId','name email image')
        .populate('jobId','title description location catgeory level salary')
        .exec()

        // if (!applications) {
          if (!applications || applications.length === 0) { 
            return res.json({success:false, message:'No Job applications found for the user.'})
        }
        
        return res.json({success:true, applications})

    } catch (error) {

        res.json({success:false, message: error.message})
        
    }

}

// update user profile (resume)
export const updateUserResume = async(req,res)=>{

    try {

      const { userId } = req.auth

        const resumeFile = req.file

        const userData =  await User.findById(userId)

         if (!userData) { // Add this check
            return res.json({success:false, message:'User not found'})
        }

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success:true, message:'Resume Updated'})
        
    } catch (error) {
        res.json({success:false,  message:error.message})
    }

}