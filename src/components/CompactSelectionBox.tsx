  const CompactSelectionBox = ({ 
    isSelected, 
    onClick, 
    disabled = false, 
    children 
  }: {
    isSelected: boolean;
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
  }) => (
    <div
      onClick={disabled ? undefined : onClick}
      className={`
        cursor-pointer transition-all duration-200 rounded-md border px-3 py-2 text-sm
        ${isSelected 
          ? 'border-teal-500 bg-teal-50 text-teal-900' 
          : 'border-gray-200 bg-white hover:border-teal-300'
        }
        ${disabled && 'opacity-60 cursor-not-allowed'}
      `}
    >
      {children}
    </div>
  );

export default CompactSelectionBox;