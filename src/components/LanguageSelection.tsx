import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Heart, Globe, ArrowRight } from 'lucide-react';

interface LanguageSelectionProps {
  onLanguageSelect: (isEnglish: boolean) => void;
}

export function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader className="text-center pb-6" style={{ backgroundColor: '#00747c10' }}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00747c' }}>
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl mb-2" style={{ color: '#00747c' }}>
            Taal Selectie / Language Selection
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Kies uw voorkeurstaal / Choose your preferred language
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            {/* Dutch Option */}
            <button
              onClick={() => onLanguageSelect(false)}
              className="w-full p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <span className="text-xl font-bold text-orange-600">NL</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">Nederlands</h3>
                    <p className="text-sm text-gray-600">Kanker Patiënt Evaluatie Formulier</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
              </div>
            </button>

            {/* English Option */}
            <button
              onClick={() => onLanguageSelect(true)}
              className="w-full p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span className="text-xl font-bold text-blue-600">EN</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">English</h3>
                    <p className="text-sm text-gray-600">Cancer Patient Evaluation Form</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
              </div>
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 pt-4 border-t">
            <div className="flex items-center justify-center gap-2">
              <Globe className="w-3 h-3" />
              <span>U kunt later altijd van taal wisselen / You can always change language later</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}