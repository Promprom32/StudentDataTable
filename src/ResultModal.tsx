"use client";

import { useEffect, useState } from "react";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: number;
}

interface ResultData {
  student: {
    name: string;
    regNo: string;
    level: string;
    session: string;
    photo: string;
  };
  courses: {
    sn: number;
    code: string;
    title: string;
    unit: number;
    grade: string;
    totalPoint: number;
  }[];
  summary: {
    unts: string;
    untd: string;
    gpts: string;
    gptd: string;
    gpats: string;
    gpatd: string;
  };
  remarks: string;
}

export function ResultModal({ isOpen, onClose, studentId }: ResultModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      fetchResult();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const fetchResult = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://test.omniswift.com.ng/api/viewResult/${studentId}`
      );
      if (!response.ok) throw new Error("Failed to fetch result");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load result");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <svg
                className="animate-spin h-8 w-8 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center h-64 flex items-center justify-center">
              {error}
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://test.omniswift.com.ng/images/logo.png"
                    alt="College Logo"
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h2 className="text-xl font-bold">
                      FREMONT COLLEGE OF EDUCATION
                    </h2>
                    <p className="text-sm text-gray-600">
                      No.5 Raymond Osuman Street, PMB 2191
                    </p>
                    <p className="text-sm text-gray-600">
                      Maitama, Abuja, Nigeria.
                    </p>
                  </div>
                </div>
                {result.student.photo && (
                  <img
                    src={result.student.photo || "/placeholder.svg"}
                    alt="Student Photo"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Title */}
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">
                  Post Graduate Diploma in Education
                </h3>
                <p className="text-gray-600">
                  Student First Semester Statement Of Result
                </p>
              </div>

              {/* Student Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {result.student.name}
                  </p>
                  <p>
                    <span className="font-semibold">Level:</span>{" "}
                    {result.student.level}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Reg. No.:</span>{" "}
                    {result.student.regNo}
                  </p>
                  <p>
                    <span className="font-semibold">Session:</span>{" "}
                    {result.student.session}
                  </p>
                </div>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2 text-left">S/N</th>
                      <th className="border p-2 text-left">Course Code</th>
                      <th className="border p-2 text-left">Course Title</th>
                      <th className="border p-2 text-left">Unit</th>
                      <th className="border p-2 text-left">Grade</th>
                      <th className="border p-2 text-left">Total Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.courses.map((course) => (
                      <tr key={course.code} className="even:bg-gray-50">
                        <td className="border p-2">{course.sn}</td>
                        <td className="border p-2">{course.code}</td>
                        <td className="border p-2">{course.title}</td>
                        <td className="border p-2">{course.unit}</td>
                        <td className="border p-2">{course.grade}</td>
                        <td className="border p-2">{course.totalPoint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-6 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold">UNTS</p>
                  <p>{result.summary.unts}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">UNTD</p>
                  <p>{result.summary.untd}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">GPTS</p>
                  <p>{result.summary.gpts}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">GPTD</p>
                  <p>{result.summary.gptd}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">GPATS</p>
                  <p>{result.summary.gpats}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">GPATD</p>
                  <p>{result.summary.gpatd}</p>
                </div>
              </div>

              {/* Remarks */}
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Remarks:</span>{" "}
                  {result.remarks}
                </p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-8 border-t">
                <div className="w-32">
                  <p className="text-sm font-semibold">Registrar</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
