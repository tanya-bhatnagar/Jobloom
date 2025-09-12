import React from "react";
import Navbar from "../components/Navbar";

export default function ResumeTemplates() {
  const templates = [
    { id: 1, name: "Simple Resume", file: "/templates/resume1.docx",  icon: "/templates/iconresume.png" },
    { id: 2, name: "Modern Resume", file: "/templates/resume2.docx", icon: "/templates/iconresume.png" },
    { id: 3, name: "Creative Resume", file: "/templates/resume3.docx", icon: "/templates/iconresume.png" },
    { id: 4, name: "Professional Resume", file: "/templates/resume4.docx", icon: "/templates/iconresume.png" },
    { id: 5, name: "ATS-Friendly Resume", file: "/templates/resume5.docx", icon: "/templates/iconresume.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.icon}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center"
          >
            <div className="w-32 h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
              <img
                src={template.icon}
                className="w-20 h-20 object-contain"
              />
            </div>

            <h2 className="text-lg font-semibold text-center">{template.name}</h2>

            <a href={template.file} download>
              <button className="mt-3 w-60 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mx-auto block">
                Download
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
