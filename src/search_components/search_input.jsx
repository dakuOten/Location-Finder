
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState, useEffect } from 'react';

export function InputWithButton({ onValueChange }) {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    let timer;
    if (inputError) {
      timer = setTimeout(() => {
        setInputError('');
      }, 2000); // 60000 milliseconds = 1 minute
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [inputError]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setInputError("You didn't input a value");
    } else {
      setInputError('');
      onValueChange(inputValue);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim()) {
      setInputError('');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-sm space-y-2 m-3">
      <div className="flex items-center space-x-2">
        <Input 
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Address Number .." 
        />
        <Button type="submit" onClick={handleSubmit} className="bg-white-500 text-black">🔍</Button>
      </div>
      {inputError && <p className="text-red-500 text-sm">{inputError}</p>}
    </div>
  )
}
