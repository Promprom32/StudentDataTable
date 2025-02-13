import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

import SchoolLogo from "../assets/logo.png";
import ProfilePicture from "../assets/profile.png";

const ResultModal = ({ resultData, onClose }) => {
  const resultRef = useRef();

  if (!resultData) return null;

  const handleDownload = () => {
    const element = resultRef.current.cloneNode(true);
    const buttons = element.querySelector(".no-print");
    if (buttons) buttons.remove();

    const options = {
      margin: 10,
      filename: `Result_${resultData.firstname}_${resultData.surname}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compressPDF: true
      }
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-50 overflow-y-auto">
      <div
        ref={resultRef}
        className="bg-[#fff] p-6 rounded-lg w-3/4 shadow-lg max-h-full overflow-visible"
      >
        <div className="flex justify-between items-start mb-4">
          <img
            src={resultData.logo || SchoolLogo}
            alt="School Logo"
            className="w-20 h-20"
          />
          <div className="text-center flex-1">
            <h2 className="text-lg font-bold">FREMONT COLLEGE OF EDUCATION</h2>
            <p className="text-sm">
              No.5 Raymond Osuman Street, PMB 2191, Maitama, Abuja, Nigeria.
            </p>
            <h3 className="text-md font-semibold mt-2">
              Post Graduate Diploma in Education
            </h3>
            <p className="text-sm">
              Student First Semester Statement Of Result
            </p>
          </div>
          <img
            src={resultData.profile_picture || ProfilePicture}
            alt="Student"
            className="w-20 h-20 rounded-full border"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 border-b pb-3">
          <div>
            <p>
              <strong>Name:</strong> {resultData.firstname} {resultData.surname}
            </p>
            <p>
              <strong>Level:</strong> {resultData.level}
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>Reg No.:</strong> {resultData.reg_no}
            </p>
            <p>
              <strong>Session:</strong> {resultData.session}
            </p>
          </div>
        </div>

        <table className="w-full mt-4 border-collapse border">
          <thead>
            <tr className="bg-[#28839B] text-[#fff]">
              <th className="border p-2">S/N</th>
              <th className="border p-2">Course Code</th>
              <th className="border p-2">Course Title</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">Total Point</th>
            </tr>
          </thead>
          <tbody>
            {resultData.result.map((course, index) => (
              <tr key={index} className="border even:bg-[#e5e7eb]">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2 text-center">{course.coursecode}</td>
                <td className="border p-2">{course.title}</td>
                <td className="border p-2 text-center">{course.credit_unit}</td>
                <td className="border p-2 text-center">{course.grade}</td>
                <td className="border p-2 text-center">{course.total_point}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cumulative Performance Table */}
        <table className="w-full mt-6 border-collapse border">
          <thead>
            <tr className="bg-[#28839B] text-[#fff]">
              <th className="border p-2">UNTS</th>
              <th className="border p-2">UNTD</th>
              <th className="border p-2">GPTS</th>
              <th className="border p-2">GPTD</th>
              <th className="border p-2">GPATS</th>
              <th className="border p-2">GPATD</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border bg-[#e5e7eb]">
              <td className="border p-2 text-center">
                {resultData.cummulative.unts}
              </td>
              <td className="border p-2 text-center">
                {resultData.cummulative.untd}
              </td>
              <td className="border p-2 text-center">
                {resultData.cummulative.gpts}
              </td>
              <td className="border p-2 text-center">
                {resultData.cummulative.gptd}
              </td>
              <td className="border p-2 text-center">
                {resultData.cummulative.gpats}
              </td>
              <td className="border p-2 text-center">
                {resultData.cummulative.gpatd}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="mt-3">
          <strong>Remarks:</strong>{" "}
          <span className="text-[#46c35f]">
            {resultData.cummulative.remarks}
          </span>
        </p>

        <div className="mt-8">
          <p>_________________________</p>
          <p className="text-sm">Registrar</p>
        </div>

        <div className="mt-6 flex justify-center space-x-4 no-print">
          <button
            onClick={onClose}
            className="bg-[#fb2c36] text-white px-6 py-2 rounded-lg hover:bg-[#d92c30] transition"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="bg-[#28839B] text-[#fff] px-6 py-2 rounded-lg hover:bg-[#28839B] transition cursor-printer"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
