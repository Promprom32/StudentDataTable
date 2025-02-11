import React from "react";

const FetchedTable = ({ students, loading, error }) => {
  return (
    <div className="m-5 p-10">
      <div className="w-full bg-white p-12 shadow-md rounded-lg">
        {loading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto max-h-64">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead className="bg-gray-100 sticky top-0">
                <tr className="text-left">
                  <th className="p-3 font-semibold text-sm text-[#616161]">
                    S/N
                  </th>
                  <th className="p-3 font-semibold text-sm text-[#616161]">
                    Surname
                  </th>
                  <th className="p-3 font-semibold text-sm  text-[#616161]">
                    First Name
                  </th>
                  <th className="p-3 font-semibold text-sm text-[#616161]">
                    Age
                  </th>
                  <th className="p-3 font-semibold text-sm text-[#616161]">
                    Gender
                  </th>
                  <th className="p-3 font-semibold text-sm text-[#616161]">
                    Level
                  </th>
                  <th className="p-3 font-semibold text-sm text-[#616161]">
                    State
                  </th>
                  <th className="p-3 font-semibold text-sm text-[#616161]">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-t-1 border-gray-200">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{student.surname}</td>
                    <td className="p-3">{student.firstName}</td>
                    <td className="p-3">{student.age}</td>
                    <td className="p-3">{student.gender}</td>
                    <td className="p-3">{student.level}</td>
                    <td className="p-3">{student.state}</td>
                    <td className="p-3">
                      <button className="bg-green-500 text-white text-sm px-4 py-1 hover:bg-green-600 transition">
                        Download Result
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchedTable;
