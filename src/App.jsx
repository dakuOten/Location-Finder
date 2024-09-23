import React, { useState, useEffect } from 'react';
import { useSearchLocation } from './lib/externalApi';
import SearchResultsTable from './search_components/search_table';
import { InputWithButton } from './search_components/search_input';
import {clientScriptClose} from './lib/zohoApi'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [formattedResults, setFormattedResults] = useState([]);
  const { recordData, error, loading, clearSearch } = useSearchLocation(searchTerm);

  const handleChildValue = (value) => {
    setSearchTerm(value);
    if (!value.trim()) {
      // Clear search results when input is empty
      setFormattedResults([]);
      clearSearch(); // Assuming you have a clearSearch function in your useSearchLocation hook
    }
  };

  useEffect(() => {
    if (recordData && recordData.results) {
      const searchTermEntry = { title: searchTerm, address: 'Search term', isSearchTerm: true };
      const locationResults = recordData.results.map(item => ({
        title: item.formatted,
        body: item.components,
      }));

      // Remove duplicates based on both title and address
      const uniqueResults = [searchTermEntry, ...locationResults].filter((item, index, self) =>
        index === self.findIndex((t) => t.title === item.title && t.body === item.body)
      );
      

      setFormattedResults(uniqueResults);
    } else {
      setFormattedResults([]);
    }


  }, [recordData, searchTerm]);

  const handleSelectLocation = async (location) => {
    if (!location.isSearchTerm) {
      const payload = {
        selectedLocation: location.body, // Changed from location.components to location.body
        searchTerm: searchTerm
      };
      console.log('Selected Location Payload:', payload);
      clientScriptClose(payload)
      
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="mb-2 no-scrollbar">
        <InputWithButton onValueChange={handleChildValue} />
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-[20px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading...</span>
        </div>
      )}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {!loading && !error && formattedResults.length === 0 && (
        <p className="text-gray-600 flex justify-center items-center mt-[110px]">No search results. Please try a different query.</p>
      )}
      {formattedResults.length > 0 && (
        <SearchResultsTable 
          results={formattedResults} 
          onSelect={handleSelectLocation}
        />
      )}
    </div>
  );
}

export default App;
