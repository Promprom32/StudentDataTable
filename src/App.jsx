import React, { useState, useEffect } from "react";
import FilterBy from "./components/filterBy";
import FetchedTable from "./components/FetchedTable";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/viewAllData`);
        const data = await response.json();
        setStudents(data.data.students || []);
      } catch (error) {
        setError("Failed to fetch students.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStudents();
  }, []);

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/filterData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: filters.selectedAge,
          state: filters.selectedState,
          level: filters.selectedLevel,
          gender: filters.selectedGender
        })
      });

      const data = await response.json();
      setStudents(data.data.students || []);
    } catch (error) {
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
