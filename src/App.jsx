import React, { useState } from "react";
import FilterBy from "./filterBy";
import FetchedTable from "./FetchedTable";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_BASE_URL;

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/searchStudents?age=${filters.selectedAge}&gender=${filters.selectedGender}&state=${filters.selectedState}&level=${filters.selectedLevel}`
      );
      const data = await response.json();
      setStudents(data.students || []);
    } catch {
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="m-5 p-10">
        <h1 className="font-bold text-4xl text-[#343434]">
          Student Data Table
        </h1>
      </div>
      <FilterBy onSearch={handleSearch} />
      <FetchedTable students={students} loading={loading} error={error} />
    </>
  );
};

export default App;
