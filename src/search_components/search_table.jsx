import React from 'react';

const SearchResultsTable = ({ results, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md">
      {results.map((result, index) => (
        <div 
          key={index} 
          className="flex items-start p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
          onClick={() => onSelect(result)}
        >

          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900"> 📍 {result.title}</div>
            {/* <div className="text-xs text-gray-500">{result.address}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsTable;