import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
  content: string;
}

export function HelpTooltip({ content }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
      </button>
      
      {isVisible && (
        <div className="absolute z-50 w-80 p-3 mt-2 bg-white border rounded-lg shadow-lg left-0 top-full">
          <div className="text-sm text-gray-700 leading-relaxed">
            {content}
          </div>
          <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-t border-l transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}