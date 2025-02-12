"use client";
import "./index.css";
const FetchedTable = ({ students, loading, error }) => {
  if (loading) {
    return <p className="m-5 p-10">Loading...</p>;
  }

  if (error) {
    return <p className="m-5 p-10 text-red-500">Error: {error}</p>;
  }

  if (!students || students.length === 0) {
    return <p className="m-5 p-10">No students found.</p>;
  }

  return (
    <div className="m-5 p-10 overflow-x-auto">
      <div className="w-full bg-white p-12 shadow-md rounded-lg">
        <div className="overflow-x-auto max-h-64 custom-scroller cursor-pointer">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0 shadow-sm">
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
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3">{student.surname}</td>
                  <td className="p-3">{student.firstname}</td>
                  <td className="p-3">{student.age}</td>
                  <td className="p-3">{student.gender}</td>
                  <td className="p-3">{student.level}</td>
                  <td className="p-3">{student.state}</td>
                  <td className="p-3">
                    <button className="bg-green-500 text-white text-sm px-4 py-1 rounded hover:bg-green-600 transition cursor-printer">
                      Download Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FetchedTable;
