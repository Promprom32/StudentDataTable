"use client";

import { useState, useEffect } from "react";

const FilterBy = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    ages: [],
    genders: [],
    states: [],
    levels: []
  });
  const [loading, setLoading] = useState(true);

  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const API_URL = import.meta.env.VITE_BASE_URL;
  let resetTimeout = null;

  const fetchFilters = async () => {
    setLoading(true);
    try {
      const endpoints = [
        "viewAllAges",
        "viewAllGender",
        "viewAllStates",
        "viewAllLevels"
      ];
      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(`${API_URL}/${endpoint}`).then((res) => res.json())
        )
      );

      setFilters({
        ages:
          responses[0]?.data?.map((item) => ({
            id: item.id,
            value: item.age
          })) || [],
        genders:
          responses[1]?.data?.map((item) => ({
            id: item.id,
            value: item.gender
          })) || [],
        states:
          responses[2]?.data?.map((item) => ({
            id: item.id,
            value: item.name
          })) || [],
        levels:
          responses[3]?.data?.map((item) => ({
            id: item.id,
            value: item.level
          })) || []
      });
    } catch (error) {
      console.error("Error fetching filter data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleSearchClick = () => {
    onSearch({
      selectedAge,
      selectedGender,
      selectedState,
      selectedLevel
    });

    // Clear any previous reset timer
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }

    // Set a timeout to reset the application after 30 seconds
    resetTimeout = setTimeout(() => {
      window.location.reload();
    }, 30000);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[#e5e7eb] text-sm animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="relative">
          <div className="w-full h-11 bg-[#e5e7eb] rounded-md"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="m-5 p-10">
      <div className="w-full bg-[#fff] p-12 rounded-md shadow-md">
        <h2 className="text-2xl text-[#616161] font-semibold mb-10">
          Filter Student Table By:
        </h2>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[#756161] text-sm">
            <div className="relative">
              <label className="absolute -top-3 left-2 text-sm font-semibold bg-[#fff] px-1 text-[#000]">
                Age
              </label>
              <select
                className="w-full border rounded-md p-3 cursor-pointer"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
              >
                <option value="">Select Age</option>
                {filters.ages.map((age) => (
                  <option key={age.id} value={age.value}>
                    {age.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="absolute -top-3 left-2 text-sm font-semibold bg-[#fff] px-1 text-[#000]">
                State
              </label>
              <select
                className="w-full border rounded-md p-3 cursor-pointer"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {filters.states.map((state) => (
                  <option key={state.id} value={state.value}>
                    {state.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="absolute -top-3 left-2 text-sm font-semibold bg-[#fff] px-1 text-[#000]">
                Level
              </label>
              <select
                className="w-full border rounded-md p-3 cursor-pointer"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Select Level</option>
                {filters.levels.map((level) => (
                  <option key={level.id} value={level.value}>
                    {level.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="absolute -top-3 left-2 text-sm font-semibold bg-[#fff] px-1 text-[#000]">
                Gender
              </label>
              <select
                className="w-full border rounded-md p-3 cursor-pointer"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                {filters.genders.map((gender) => (
                  <option key={gender.id} value={gender.value}>
                    {gender.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                className="w-full bg-[#46C35F] text-[#fff] px-6 py-3 rounded-md"
                onClick={handleSearchClick}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBy;
