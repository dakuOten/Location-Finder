import React from 'react';
import locationImage from "../assets/location.png"
const SearchResultsTable = ({ results, onSelect }) => {
  // Filter out the search term from the results
  const filteredResults = results.filter(result => !result.isSearchTerm);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md">
      {filteredResults.map((result, index) => (
        <div 
          key={index} 
          className="flex items-start p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
          onClick={() => onSelect(result)}
        >
      <div className="flex items-center">
        <img src={locationImage} alt="Location" width="20" height="20" className="mr-2" />
        <div className="text-sm font-medium text-gray-900">{result.title}</div>
      </div>

        </div>
      ))}
    </div>
  );
};

export default SearchResultsTable;