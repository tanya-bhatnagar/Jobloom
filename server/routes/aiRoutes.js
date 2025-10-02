// import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const SYSTEM_PROMPT = `You are an AI assistant designed to provide systematic, well-structured, and comprehensive answers. Follow these guidelines for every response:

// **RESPONSE STRUCTURE:**
// 1. **Brief Summary**: Start with a concise overview of what you'll address
// 2. **Detailed Explanation**: Provide thorough information broken into logical sections
// 3. **Examples**: Include relevant examples when applicable
// 4. **Key Points**: Highlight the most important takeaways
// 5. **Next Steps/Recommendations**: Suggest actionable items when relevant

// **FORMATTING GUIDELINES:**
// - Use clear headings and subheadings
// - Break complex information into bullet points or numbered lists
// - Include code examples for technical queries
// - Provide step-by-step instructions for processes
// - Use markdown formatting for better readability

// **TONE AND STYLE:**
// - Be professional yet approachable
// - Explain technical terms when first used
// - Provide context for your answers
// - Be thorough but concise
// - Include relevant warnings or considerations

// **QUALITY STANDARDS:**
// - Fact-check information before presenting
// - Provide multiple perspectives when applicable
// - Include sources or references when possible
// - Address potential follow-up questions
// - Ensure practical applicability

// Now, please respond to the following user query following these systematic guidelines:`;

// router.post("/ask", async (req, res) => {
//   try {
//     const { prompt, context = "", language = "english" } = req.body;

//     if (!prompt) {
//       return res.status(400).json({
//         error: "Prompt is missing",
//         message: "Please provide a prompt in the request body"
//       });
//     }

//     const enhancedPrompt = `${SYSTEM_PROMPT}

// **User Context:** ${context}
// **Preferred Language:** ${language}
// **User Query:** ${prompt}

// Please provide a systematic and comprehensive response following the guidelines above.`;

//     // FIX: Use correct model name without -latest suffix
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash-latest",
//       generationConfig: {
//         temperature: 0.7,
//         topK: 40,
//         topP: 0.95,
//         maxOutputTokens: 2048,
//       },
//     });

//     const result = await model.generateContent(enhancedPrompt);
//     const text = result.response.text();

//     res.json({
//       reply: text,
//       metadata: {
//         model: "gemini-1.5-flash-latest",
//         timestamp: new Date().toISOString(),
//         prompt_length: prompt.length,
//         response_length: text.length,
//         systematic_format: true
//       }
//     });

//   } catch (error) {
//     console.error("Gemini API Error:", error);

//     if (error.message?.includes('API key')) {
//       return res.status(401).json({
//         error: "API Authentication Error",
//         message: "Please check your Gemini API key"
//       });
//     }

//     if (error.message?.includes('quota')) {
//       return res.status(429).json({
//         error: "API Quota Exceeded",
//         message: "API usage limit reached. Please try again later."
//       });
//     }

//     res.status(500).json({
//       error: "Internal Server Error",
//       message: error.message || "Unknown error occurred",
//       timestamp: new Date().toISOString()
//     });
//   }
// });

// router.post("/ask-custom", async (req, res) => {
//   try {
//     const {
//       prompt,
//       systemPrompt = SYSTEM_PROMPT,
//       temperature = 0.7,
//       maxTokens = 2048,
//       context = ""
//     } = req.body;

//     if (!prompt) {
//       return res.status(400).json({
//         error: "Prompt is missing"
//       });
//     }

//     // FIX: Use correct model name
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash-latest",
//       generationConfig: {
//         temperature: temperature,
//         topK: 40,
//         topP: 0.95,
//         maxOutputTokens: maxTokens,
//       },
//     });

//     const enhancedPrompt = `${systemPrompt}

// **Context:** ${context}
// **User Query:** ${prompt}`;

//     const result = await model.generateContent(enhancedPrompt);
//     const text = result.response.text();

//     res.json({
//       reply: text,
//       config: {
//         temperature,
//         maxTokens,
//         customSystemPrompt: systemPrompt !== SYSTEM_PROMPT
//       }
//     });

//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     res.status(500).json({
//       error: "Internal Server Error",
//       message: error.message || "Unknown error occurred"
//     });
//   }
// });

// export default router;

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Validate API key on startup
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are an AI assistant designed to provide systematic, well-structured, and comprehensive answers. Follow these guidelines for every response:

**RESPONSE STRUCTURE:**
1. **Brief Summary**: Start with a concise overview of what you'll address
2. **Detailed Explanation**: Provide thorough information broken into logical sections
3. **Examples**: Include relevant examples when applicable
4. **Key Points**: Highlight the most important takeaways
5. **Next Steps/Recommendations**: Suggest actionable items when relevant

**FORMATTING GUIDELINES:**
- Use clear headings and subheadings
- Break complex information into bullet points or numbered lists
- Include code examples for technical queries
- Provide step-by-step instructions for processes
- Use markdown formatting for better readability

**TONE AND STYLE:**
- Be professional yet approachable
- Explain technical terms when first used
- Provide context for your answers
- Be thorough but concise
- Include relevant warnings or considerations

**QUALITY STANDARDS:**
- Fact-check information before presenting
- Provide multiple perspectives when applicable
- Include sources or references when possible
- Address potential follow-up questions
- Ensure practical applicability

Now, please respond to the following user query following these systematic guidelines:`;

// Helper function to get working model
async function getWorkingModel() {
  const modelOptions = [
    "gemini-pro",
    "gemini-1.5-pro",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002"
  ];

  for (const modelName of modelOptions) {
    try {
      console.log(`Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      });
      
      // Test the model with a simple query
      await model.generateContent("test");
      console.log(`✅ Working model found: ${modelName}`);
      return { model, modelName };
    } catch (error) {
      console.log(`❌ Model ${modelName} failed: ${error.message}`);
      continue;
    }
  }
  
  throw new Error('No working Gemini model found. Please check your API key and quota.');
}

router.post("/ask", async (req, res) => {
  try {
    const { prompt, context = "", language = "english" } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is missing",
        message: "Please provide a prompt in the request body"
      });
    }

    const enhancedPrompt = `${SYSTEM_PROMPT}

**User Context:** ${context}
**Preferred Language:** ${language}
**User Query:** ${prompt}

Please provide a systematic and comprehensive response following the guidelines above.`;

    // Get a working model
    const { model, modelName } = await getWorkingModel();

    const result = await model.generateContent(enhancedPrompt);
    const text = result.response.text();

    res.json({
      reply: text,
      metadata: {
        model: modelName,
        timestamp: new Date().toISOString(),
        prompt_length: prompt.length,
        response_length: text.length,
        systematic_format: true
      }
    });

  } catch (error) {
    console.error("Gemini API Error:", error);

    if (error.message?.includes('API key')) {
      return res.status(401).json({
        error: "API Authentication Error",
        message: "Invalid or missing Gemini API key. Please check your .env file.",
        hint: "Get your API key from https://aistudio.google.com/app/apikey"
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('429')) {
      return res.status(429).json({
        error: "API Quota Exceeded",
        message: "API usage limit reached. Please try again later or upgrade your quota."
      });
    }

    if (error.message?.includes('models/') || error.message?.includes('404')) {
      return res.status(400).json({
        error: "Model Not Available",
        message: "The Gemini model is not accessible. This could be due to region restrictions or API configuration.",
        details: error.message,
        hint: "Check if your API key has access to Gemini models at https://aistudio.google.com"
      });
    }

    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Unknown error occurred",
      timestamp: new Date().toISOString()
    });
  }
});

router.post("/ask-custom", async (req, res) => {
  try {
    const {
      prompt,
      systemPrompt = SYSTEM_PROMPT,
      temperature = 0.7,
      maxTokens = 2048,
      context = ""
    } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is missing"
      });
    }

    const { model, modelName } = await getWorkingModel();

    const enhancedPrompt = `${systemPrompt}

**Context:** ${context}
**User Query:** ${prompt}`;

    const result = await model.generateContent(enhancedPrompt);
    const text = result.response.text();

    res.json({
      reply: text,
      config: {
        model: modelName,
        temperature,
        maxTokens,
        customSystemPrompt: systemPrompt !== SYSTEM_PROMPT
      }
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Unknown error occurred"
    });
  }
});

// Test endpoint
router.get("/test", async (req, res) => {
  try {
    const hasApiKey = !!process.env.GEMINI_API_KEY;
    
    if (!hasApiKey) {
      return res.json({
        success: false,
        message: "GEMINI_API_KEY not found in environment variables"
      });
    }

    const { model, modelName } = await getWorkingModel();
    const result = await model.generateContent("Say 'API is working!'");
    const text = result.response.text();

    res.json({
      success: true,
      message: "Gemini API is working correctly!",
      model: modelName,
      testResponse: text
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gemini API test failed",
      error: error.message
    });
  }
});

export default router;