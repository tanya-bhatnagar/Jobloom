import React from "react";
import Navbar from "../components/Navbar";

export default function ResumeTemplates() {
  const templates = [
    { id: 1, name: "Simple Resume", file: "/templates/resume1.docx", icon: "/templates/iconresume.png" },
    { id: 2, name: "Modern Resume", file: "/templates/resume2.docx", icon: "/templates/iconresume.png" },
    { id: 3, name: "Creative Resume", file: "/templates/resume3.docx", icon: "/templates/iconresume.png" },
    { id: 4, name: "Professional Resume", file: "/templates/resume4.docx", icon: "/templates/iconresume.png" },
    { id: 5, name: "ATS-Friendly Resume", file: "/templates/resume5.docx", icon: "/templates/iconresume.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Resume Templates
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow"
            >
              {/* Icon Box */}
              <div className="w-28 h-32 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                <img
                  src={template.icon}
                  alt={template.name}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Resume Name */}
              <h2 className="text-lg font-semibold text-center mb-3">
                {template.name}
              </h2>

              {/* Download Button */}
              <a href={template.file} download className="w-full">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                  Download
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
