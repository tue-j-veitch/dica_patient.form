import React, { useState } from 'react';
import { Building, Users, Calendar } from 'lucide-react';

interface ClinicianEntry {
  clinicianName: string;
  clinicianAvatar: string;
  timestamp: Date;
  section: string;
  hospital?: string;
  department?: string;
}

interface ClinicianTooltipProps {
  clinician: ClinicianEntry;
  children: React.ReactNode;
}

export function ClinicianTooltip({ clinician, children }: ClinicianTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div className="absolute z-50 w-72 p-4 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg left-0 top-full">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{clinician.clinicianName}</h4>
              <p className="text-sm text-gray-600">Healthcare Provider</p>
            </div>
            
            {clinician.hospital && (
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Hospital</p>
                  <p className="text-sm text-gray-600">{clinician.hospital}</p>
                </div>
              </div>
            )}
            
            {clinician.department && (
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Department</p>
                  <p className="text-sm text-gray-600">{clinician.department}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
              <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Last Updated</p>
                <p className="text-sm text-gray-600">
                  {clinician.timestamp.toLocaleDateString()} at {clinician.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          </div>
          
          {/* Tooltip arrow */}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}