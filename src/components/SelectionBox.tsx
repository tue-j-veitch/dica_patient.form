const SelectionBox = ({ 
    isSelected, 
    onClick, 
    disabled = false, 
    children, 
    className = '' 
  }: {
    isSelected: boolean;
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      onClick={disabled ? undefined : onClick}
      className={`
        relative cursor-pointer transition-all duration-200 rounded-lg border-2 p-4
        ${isSelected 
          ? 'border-teal-500 bg-teal-50 shadow-md' 
          : 'border-gray-200 bg-white'
        }
        ${!disabled 
          ? 'hover:border-teal-300 hover:bg-teal-25 hover:shadow-sm' 
          : 'opacity-60 cursor-not-allowed'
        }
        ${className}
      `}
    >
      <div className={`
        absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-200
        ${isSelected 
          ? 'border-teal-500 bg-teal-500' 
          : 'border-gray-300 bg-white'
        }
      `}>
        {isSelected && (
          <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
        )}
      </div>
      {children}
    </div>
  );

export default SelectionBox;