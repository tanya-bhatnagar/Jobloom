import express from 'express';
import multer from 'multer';
import { CohereClient } from 'cohere-ai';
import mongoose from 'mongoose';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const router = express.Router();

// ─── Mongoose Schema ──────────────────────────────────────────────────────────
const resumeCheckSchema = new mongoose.Schema({
    fileName: String,
    atsScore: Number,
    suggestions: String,
    extractedText: String,
    createdAt: { type: Date, default: Date.now }
});
const ResumeCheck = mongoose.model('ResumeCheck', resumeCheckSchema);

// ─── Cohere Client ────────────────────────────────────────────────────────────
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

// ─── Multer Config ────────────────────────────────────────────────────────────
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files allowed'), false);
        }
    }
});

// ─── PDF Text Extraction using pdfjs-dist ─────────────────────────────────────
const extractTextFromPDF = async (buffer) => {
    const uint8Array = new Uint8Array(buffer);
    const loadingTask = getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
    }

    const text = fullText.trim();
    if (!text || text.length < 50) {
        throw new Error('Too little text extracted — may be a scanned PDF');
    }
    return text;
};

// ─── Cohere AI Analysis ───────────────────────────────────────────────────────
const analyzeResumeWithCohere = async (resumeText) => {
    const prompt = `You are an expert ATS resume analyst. Carefully read the following resume and provide a detailed, PERSONALIZED analysis based on its actual content.

RESUME CONTENT:
${resumeText.substring(0, 4000)}

INSTRUCTIONS:
- Read the resume carefully and base your entire analysis on what is actually written
- Give a realistic ATS score between 55-95 based on formatting, keywords, and content quality
- Suggest 2-3 job roles that match the candidate's actual skills and experience
- Write an overall impression based on what you actually see in the resume
- Give 2 specific, actionable improvement suggestions based on what is MISSING or WEAK in this resume

REQUIRED OUTPUT FORMAT (use exactly this format):
**ATS Score**
[number]

**Role Suggestion(s)**
* [Role 1]
* [Role 2]
* [Role 3 if applicable]

**Overall Impression**
[2-3 sentences based on actual resume content]

**Improvement Suggestions**
* [Specific suggestion 1 based on what this resume is missing]
* [Specific suggestion 2 based on what this resume is missing]

IMPORTANT: Every part of your response must be based on the actual resume content above. Do NOT give generic advice.`;

    const response = await cohere.chat({
        model: 'command-r-plus-08-2024',
        message: prompt,
        temperature: 0.3,
    });

    const text = response.text?.trim();
    console.log('Cohere Response:', text);

    if (!text || !text.includes('**ATS Score**')) {
        throw new Error('Invalid response format from Cohere');
    }

    const scoreMatch = text.match(/\*\*ATS Score\*\*\s*\n\s*(\d+)/);
    const atsScore = scoreMatch ? parseInt(scoreMatch[1]) : 70;

    return {
        atsScore: Math.max(55, Math.min(95, atsScore)),
        suggestions: text
    };
};

// ─── Main Route ───────────────────────────────────────────────────────────────
router.post('/check', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No resume file uploaded' });
        }

        console.log('Processing resume:', req.file.originalname);

        let extractedText;
        try {
            extractedText = await extractTextFromPDF(req.file.buffer);
            console.log('Text extracted, length:', extractedText.length);
        } catch (err) {
            console.error('PDF extraction failed:', err.message);
            return res.status(422).json({
                success: false,
                message: 'Could not read your PDF. Please make sure it is a text-based PDF (not a scanned image).'
            });
        }

        let analysis;
        try {
            analysis = await analyzeResumeWithCohere(extractedText);
        } catch (err) {
            console.error('Cohere analysis failed:', err.message);
            return res.status(500).json({
                success: false,
                message: 'AI analysis failed. Please try again.'
            });
        }

        const resumeCheck = new ResumeCheck({
            fileName: req.file.originalname,
            atsScore: analysis.atsScore,
            suggestions: analysis.suggestions,
            extractedText: extractedText.substring(0, 500)
        });
        await resumeCheck.save();

        console.log('Analysis complete. ATS Score:', analysis.atsScore);

        res.json({
            success: true,
            atsScore: analysis.atsScore,
            suggestions: analysis.suggestions
        });

    } catch (error) {
        console.error('Resume check error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to analyze resume. Please try again.',
            error: error.message
        });
    }
});

// ─── Test Route ───────────────────────────────────────────────────────────────
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Resume routes working!',
        cohereConfigured: !!process.env.COHERE_API_KEY
    });
});

export default router;