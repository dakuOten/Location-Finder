import React, { useState, useEffect } from 'react';
import { useSearchLocation } from './lib/externalApi';
import SearchResultsTable from './search_components/search_table';
import { InputWithButton } from './search_components/search_input';


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

  const handleSelectLocation = (location) => {
    if (!location.isSearchTerm) {
      const payload = {
        selectedLocation: location.body, // Changed from location.components to location.body
        searchTerm: searchTerm
      };
      console.log('Selected Location Payload:', payload);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <InputWithButton onValueChange={handleChildValue} />
      </div>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
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