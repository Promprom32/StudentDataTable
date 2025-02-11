import React, { useState, useEffect } from "react";

const FilterBy = ({ onSearch }) => {
  const [ages, setAges] = useState([]);
  const [genders, setGenders] = useState([]);
  const [states, setStates] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected filter states
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [agesRes, gendersRes, statesRes, levelsRes] = await Promise.all([
          fetch("https://test.omniswift.com.ng/api/viewAllAges").then((res) =>
            res.json()
          ),
          fetch("https://test.omniswift.com.ng/api/viewAllGender").then((res) =>
            res.json()
          ),
          fetch("https://test.omniswift.com.ng/api/viewAllStates").then((res) =>
            res.json()
          ),
          fetch("https://test.omniswift.com.ng/api/viewAllLevels").then((res) =>
            res.json()
          )
        ]);

        console.log("API Responses:", {
          agesRes,
          gendersRes,
          statesRes,
          levelsRes
        });

        // Correctly map the API response
        setAges(
          agesRes.data?.map((item) => ({ id: item.id, value: item.age })) || []
        );
        setGenders(
          gendersRes.data?.map((item) => ({
            id: item.id,
            value: item.gender
          })) || []
        );
        setStates(
          statesRes.data?.map((item) => ({ id: item.id, value: item.name })) ||
            []
        );
        setLevels(
          levelsRes.data?.map((item) => ({ id: item.id, value: item.level })) ||
            []
        );
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleSearchClick = () => {
    onSearch({ selectedAge, selectedGender, selectedState, selectedLevel });
  };

  return (
    <div className="m-5 p-10">
      <div className="w-full bg-white p-12 rounded-md shadow-md">
        <h2 className="text-2xl text-[#616161] font-semibold mb-10">
          Filter Student Table By:
        </h2>
        {loading ? (
          <p>Loading filters...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-gray-400 text-sm">
            {/* Age */}
            <div className="relative">
              <label className="absolute -top-3 left-2 text-sm font-semibold text-[#616161] bg-white px-1 text-[#000]">
                Age
              </label>
              <select
                className="w-full border rounded-md p-3"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
              >
                <option value="">Select Age</option>
                {ages.map((age) => (
                  <option key={age.id} value={age.value}>
                    {age.value}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="relative">
              <label className="absolute -top-3 left-2 text-sm text-[#616161] font-semibold bg-white px-1 text-[#000]">
                State
              </label>
              <select
                className="w-full border rounded-md p-3"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.value}>
                    {state.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div className="relative">
              <label className="absolute -top-3 left-2 text-sm text-[#616161] font-semibold bg-white px-1 text-[#000]">
                Level
              </label>
              <select
                className="w-full border rounded-md p-3"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Select Level</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.value}>
                    {level.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div className="relative">
              <label className="absolute -top-3 left-2 text-sm text-[#616161] font-semibold bg-white px-1 text-[#000]">
                Gender
              </label>
              <select
                className="w-full border rounded-md p-3"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                {genders.map((gender) => (
                  <option key={gender.id} value={gender.value}>
                    {gender.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                className="w-full bg-[#46C35F] text-white px-6 py-3 rounded-md"
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
