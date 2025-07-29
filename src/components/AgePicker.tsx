import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Edit3 } from 'lucide-react';

interface AgePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function AgePicker({ value, onChange }: AgePickerProps) {
  const [displayAge, setDisplayAge] = useState(parseInt(value) || 50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const incrementAge = () => {
    if (displayAge < 120) {
      animateChange(displayAge + 1);
    }
  };

  const decrementAge = () => {
    if (displayAge > 0) {
      animateChange(displayAge - 1);
    }
  };

  const animateChange = (newAge: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setDisplayAge(newAge);
      onChange(newAge.toString());
      setIsAnimating(false);
    }, 100);
  };

  const handleClick = () => {
    setIsEditing(true);
    setTempValue(displayAge.toString());
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || (/^\d+$/.test(newValue) && parseInt(newValue) <= 120)) {
      setTempValue(newValue);
    }
  };

  const handleInputBlur = () => {
    const newAge = parseInt(tempValue) || 0;
    if (newAge >= 0 && newAge <= 120) {
      animateChange(newAge);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newAge = Math.min(120, parseInt(tempValue) + 1 || 1);
      setTempValue(newAge.toString());
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newAge = Math.max(0, parseInt(tempValue) - 1 || 0);
      setTempValue(newAge.toString());
    }
  };

  useEffect(() => {
    if (value && !isNaN(parseInt(value))) {
      setDisplayAge(parseInt(value));
    }
  }, [value]);

  return (
    <div className="relative">
      <div 
        className="flex items-center justify-center w-32 h-20 bg-gradient-to-br from-white to-gray-50 border-2 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 group"
        style={{ borderColor: '#00747c20' }}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              incrementAge();
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors opacity-60 group-hover:opacity-100"
            disabled={displayAge >= 120}
          >
            <ChevronUp className="w-5 h-5" style={{ color: '#00747c' }} />
          </button>
          
          <div className="relative h-8 w-16 flex items-center justify-center overflow-hidden">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={tempValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="w-full text-center text-2xl font-semibold bg-transparent border-none outline-none"
                style={{ color: '#00747c' }}
                maxLength={3}
              />
            ) : (
              <div
                className={`text-2xl font-semibold transition-transform duration-200 flex items-center gap-1 ${
                  isAnimating ? 'transform -translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
                }`}
                style={{ color: '#00747c' }}
              >
                {displayAge}
                <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            )}
          </div>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              decrementAge();
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors opacity-60 group-hover:opacity-100"
            disabled={displayAge <= 0}
          >
            <ChevronDown className="w-5 h-5" style={{ color: '#00747c' }} />
          </button>
        </div>
      </div>
      
      {!isEditing && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <p className="text-xs text-gray-500 whitespace-nowrap">Click to edit</p>
        </div>
      )}
    </div>
  );
}