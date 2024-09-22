import { useState, useEffect, useCallback } from "react";
import Globals from "./global";

const useSearchLocation = (keywords) => {
  const [recordData, setRecordData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearSearch = useCallback(() => {
    setRecordData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      if (!keywords.trim()) {
        clearSearch();
        return;
      }

      setLoading(true);

      try {
        let query = `${keywords}+US`
        let params = { 'q': query, 'key': Globals.apiKey };
        let queryString = new URLSearchParams(params).toString();
        
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };

        const response = await fetch(`${Globals.apiUrl}?${queryString}`, requestOptions);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (!isCancelled) {
          setRecordData(result);
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isCancelled = true;
    }

  }, [keywords, clearSearch]);

  return { recordData, error, loading, clearSearch };
};

export { useSearchLocation };