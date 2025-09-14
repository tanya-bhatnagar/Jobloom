import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const InterviewPreparation = () => {
    const [activeTab, setActiveTab] = useState('questions');
    const [questionsData, setQuestionsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const staticQuestions = [
        {
            category: "General Questions",
            questions: [
                {
                    question: "Tell me about yourself",
                    tip: "Keep it professional, focus on relevant experience, skills, and career goals. Structure: Present → Past → Future"
                },
                {
                    question: "Why do you want to work here?",
                    tip: "Research the company thoroughly. Mention specific projects, values, or goals that align with yours"
                }
            ]
        }
    ];

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/interview/questions')

            if (response.ok) {
                const data = await response.json()
                setQuestionsData(data.data)
            } else {
                throw new Error('Failed to fetch questions')
            }
        } catch (err) {
            console.error('Error:', err)
            setQuestionsData(staticQuestions)
        } finally {
            setLoading(false);
        }
    };

    const interviewTips = [
        {
            title: "Before the Interview",
            tips: [
                "Research the company, its culture, recent news, and competitors",
                "Review the job description and prepare examples matching requirements",
                "Prepare questions to ask the interviewer",
                "Plan your route and arrive 10-15 minutes early",
                "Bring multiple copies of your resume and a notepad"
            ]
        },
        {
            title: "During the Interview",
            tips: [
                "Maintain good eye contact and confident body language",
                "Listen actively and ask for clarification if needed",
                "Provide specific examples to support your answers",
                "Stay positive when discussing previous experiences",
                "Take notes to show engagement and interest"
            ]
        },
        {
            title: "After the Interview",
            tips: [
                "Send a thank-you email within 24 hours",
                "Reiterate your interest in the position",
                "Address any concerns that came up during the interview",
                "Follow up appropriately if you don't hear back",
                "Reflect on the experience for future interviews"
            ]
        }
    ];

    const questionsToAsk = [
        "What does success look like in this role?",
        "What are the biggest challenges facing the team?",
        "How would you describe the company culture?",
        "What opportunities are there for professional development?",
        "What's the next step in the interview process?",
        "How do you measure performance in this position?",
        "What do you enjoy most about working here?",
        "Where do you see the company heading in the next 5 years?"
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading interview tips...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="py-8 px-4 max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Preparation Guide</h1>
                    <p className="text-xl text-gray-600">Master your next job interview with our comprehensive preparation guide</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <a
                        href="https://www.geeksforgeeks.org/interview-questions/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        GeeksforGeeks Questions
                    </a>
                    <a
                        href="https://www.glassdoor.co.in/Interview/index.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                        Glassdoor Questions
                    </a>
                    <a
                        href="https://in.indeed.com/career-advice/interviewing/top-interview-questions-and-answers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
                    >
                        Indeed Q&A
                    </a>
                    <a
                        href="https://prepinsta.com/interview-preparation/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                    >
                        PrepInsta Guide
                    </a>
                </div>

                <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-sm p-2">
                    {['questions', 'tips', 'questions-to-ask'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 rounded-lg font-semibold transition-all text-lg ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab === 'questions' && 'Common Questions'}
                            {tab === 'tips' && 'Interview Tips'}
                            {tab === 'questions-to-ask' && 'Questions to Ask'}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    {activeTab === 'questions' && (
                        <div id="common-questions">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">Common Interview Questions</h2>
                            <div className="space-y-10">
                                {questionsData.map((category, categoryIndex) => (
                                    <div key={categoryIndex} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-8 border-blue-500">
                                        <div className="flex items-center mb-6">
                                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                                                {categoryIndex + 1}
                                            </div>
                                            <h3 className="text-3xl font-bold text-gray-800">{category.category}</h3>
                                        </div>
                                        <div className="grid gap-8">
                                            {category.questions.map((item, index) => (
                                                <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                                                            Q{index + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-xl font-bold text-gray-900 mb-4 leading-relaxed">
                                                                {item.question}
                                                            </h4>
                                                            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 p-6 rounded-lg">
                                                                <div className="flex items-start gap-3">
                                                                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                        💡
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-green-800 font-semibold mb-2">Expert Tip:</p>
                                                                        <p className="text-gray-700 leading-relaxed">{item.tip}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tips' && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Interview Tips & Best Practices</h2>
                            <div className="space-y-8">
                                {interviewTips.map((section, index) => (
                                    <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                                        <ul className="space-y-3">
                                            {section.tips.map((tip, tipIndex) => (
                                                <li key={tipIndex} className="flex items-start">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-gray-700">{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'questions-to-ask' && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Smart Questions to Ask Interviewers</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Asking thoughtful questions shows genuine interest and helps you evaluate the company.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {questionsToAsk.map((question, index) => (
                                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <p className="text-gray-800 font-medium">{question}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-red-800 mb-3">Questions to Avoid:</h4>
                                    <ul className="space-y-2 text-red-700">
                                        <li> "What does your company do?" (Shows lack of research)</li>
                                        <li> "How much vacation time do I get?" (Save for after job offer)</li>
                                        <li> "Can I work from home?" (Ask about work arrangements tactfully)</li>
                                        <li> "How quickly can I get promoted?" (Sounds impatient)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Ready to Ace Your Interview? 🚀</h3>
                    <p className="text-xl mb-6">Practice makes perfect. Use these tips to boost your confidence!</p>
                </div>
            </div>
        </div>
    );
};

export default InterviewPreparation;
