import { useState } from "react";
import ResultModal from "./ResultModal";

const FetchedTable = ({ students, loading, error }) => {
  const [selectedResult, setSelectedResult] = useState(null);
  const API_URL = import.meta.env.VITE_BASE_URL;
  const fetchResult = async (id) => {
    try {
      const response = await fetch(`${API_URL}/viewResult/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ student_id: id })
      });

      if (!response.ok) {
        throw new Error("Result not found");
      }

      const resultData = await response.json();
      if (resultData.message !== "Successfull") {
        throw new Error("Invalid result data");
      }

      setSelectedResult(resultData.data);
    } catch (err) {
      alert("Error fetching result: " + err.message);
    }
  };

  if (loading) return <p className="m-5 p-10">Loading...</p>;
  if (error) return <p className="m-5 p-10 text-[#fb2c36]">Error: {error}</p>;
  if (!students || students.length === 0)
    return <p className="m-5 p-10">No students found.</p>;

  return (
    <div className="m-5 p-10 overflow-x-auto">
      <div className="w-full bg-[#fff] p-12 shadow-md rounded-lg">
        <div className="overflow-x-auto max-h-64 custom-scroller cursor-pointer">
          <table className="w-full border-collapse">
            <thead className="bg-[#e5e7eb] sticky top-0 shadow-sm">
              <tr className="text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Surname</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Level</th>
                <th className="p-3">State</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-[#e5e7eb]">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3">{student.surname}</td>
                  <td className="p-3">{student.firstname}</td>
                  <td className="p-3">{student.age}</td>
                  <td className="p-3">{student.gender}</td>
                  <td className="p-3">{student.level}</td>
                  <td className="p-3">{student.state}</td>
                  <td className="p-3">
                    <button
                      className="bg-[#46c36f] text-[#fff] text-sm px-4 py-1 rounded hover:bg-[#46c36f] transition cursor-pointer"
                      onClick={() => fetchResult(student.id)}
                    >
                      Download Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ResultModal
        resultData={selectedResult}
        onClose={() => setSelectedResult(null)}
      />
    </div>
  );
};

export default FetchedTable;
