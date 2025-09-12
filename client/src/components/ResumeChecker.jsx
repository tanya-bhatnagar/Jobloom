import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import rocket from "../assets/rocket.png";
import check from "../assets/check.png";

export default function ResumeChecker() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return alert("Please upload a resume first!");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("resume", file);

            const res = await axios.post("/api/resume/check", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setResult(res.data);
        } catch (err) {
            alert("Error checking resume. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

            <Navbar />
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-3 mt-10">
                Is your resume good enough
            </h2>

            <div className="p-6 max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-2xl border border-gray-200">

                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-3">
                    <img
                        src={rocket}
                        alt="rocket icon"
                        className="w-8 h-8 animate-bounce"
                    />
                    ATS Resume Checker
                </h2>

                <div className="flex flex-col items-center space-y-4">
                    <label className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl p-6 bg-blue-50 hover:bg-blue-100 transition">
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                        />
                        <span className="text-gray-700 font-medium">
                            {file ? file.name : "Click to upload your resume"}
                        </span>
                    </label>

                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50"
                    >
                        {loading ? "Checking..." : "Check Resume"}
                    </button>
                </div>

                {result && (
                    <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <p className="text-xl font-semibold text-gray-800">
                            ✅ ATS Score:{" "}
                            <span className="text-blue-600">{result.atsScore}%</span>
                        </p>
                        <h3 className="mt-4 text-lg font-semibold text-gray-700">
                            Suggestions:
                        </h3>
                        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                            {result.suggestions.split("\n").map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-blue-100 py-12 rounded-t-2xl shadow-inner">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-3">
                    <img
                        src={check}
                        alt="rocket icon"
                        className="w-10 h-10 items-center "
                    />
                    Is your resume good enough?
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                    Upload now and check how ATS-friendly your resume really is .
                </p>

            </div>

        </div>
    );
}
