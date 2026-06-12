import { extractTextFromPDF } from '../utils/pdfExtractor.js';
import { analyzeResumeWithGemini } from '../services/geminiService.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';
import ResumeCheck from '../models/ResumeCheck.js';

export const checkResume = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No resume file uploaded'
            });
        }

        const { buffer, originalname, mimetype } = req.file;

        // Extract text from PDF
        console.log('Extracting text from PDF...');
        const resumeText = await extractTextFromPDF(buffer);
        
        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Could not extract text from PDF. Please ensure the PDF is text-readable.'
            });
        }

        // Upload to Cloudinary for storage (optional)
        console.log('Uploading to Cloudinary...');
        const cloudinaryResult = await uploadToCloudinary(buffer, originalname);

        // Analyze resume with Gemini AI
        console.log('Analyzing resume with Gemini AI...');
        const analysisResult = await analyzeResumeWithGemini(resumeText);

        // Save to database
        const resumeCheck = new ResumeCheck({
            fileName: originalname,
            fileUrl: cloudinaryResult.secure_url,
            cloudinaryPublicId: cloudinaryResult.public_id,
            atsScore: analysisResult.atsScore,
            suggestions: analysisResult.suggestions,
            extractedText: resumeText,
            fileSize: buffer.length,
            mimeType: mimetype,
            createdAt: new Date()
        });

        await resumeCheck.save();

        // Return analysis result
        res.status(200).json({
            success: true,
            atsScore: analysisResult.atsScore,
            suggestions: analysisResult.suggestions,
            message: 'Resume analyzed successfully'
        });

    } catch (error) {
        console.error('Resume check error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to analyze resume',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};