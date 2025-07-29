import React from 'react';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

interface BMICalculatorProps {
  height: number[];
  weight: number[];
  onHeightChange: (value: number[]) => void;
  onWeightChange: (value: number[]) => void;
  isEnglish?: boolean;
}

export function BMICalculator({ 
  height, 
  weight, 
  onHeightChange, 
  onWeightChange, 
  isEnglish = false 
}: BMICalculatorProps) {
  const t = {
    heightLabel: isEnglish ? "Height" : "Lengte",
    weightLabel: isEnglish ? "Weight" : "Gewicht",
    bmiResult: isEnglish ? "Your BMI Result" : "Uw BMI Resultaat",
    healthGuidance: isEnglish ? "Health Guidance" : "Gezondheidsadvies",
    bmiCategories: {
      underweight: isEnglish ? "Underweight" : "Ondergewicht",
      healthy: isEnglish ? "Healthy weight" : "Gezond gewicht",
      overweight: isEnglish ? "Overweight" : "Overgewicht"
    },
    bmiAdvice: {
      underweight: isEnglish 
        ? "Consider discussing healthy weight gain strategies with your healthcare provider."
        : "Overweeg om gezonde strategieën voor gewichtstoename te bespreken met uw zorgverlener.",
      healthy: isEnglish
        ? "Great! Your BMI is in the healthy range. Continue maintaining your current lifestyle."
        : "Geweldig! Uw BMI is in het gezonde bereik. Blijf uw huidige levensstijl volhouden.",
      overweight: isEnglish
        ? "Consider discussing healthy weight management options with your healthcare provider."
        : "Overweeg om gezonde opties voor gewichtsbeheer te bespreken met uw zorgverlener."
    }
  };

  // Use default values if arrays are empty
  const currentHeight = height.length > 0 ? height[0] : 170;
  const currentWeight = weight.length > 0 ? weight[0] : 70;

  const calculateBMI = () => {
    if (height.length === 0 || weight.length === 0) return 0;
    const heightInMeters = currentHeight / 100;
    return currentWeight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'underweight';
    if (bmi >= 18.5 && bmi < 25) return 'healthy';
    return 'overweight';
  };

  const getBMICategoryColor = (category: string) => {
    switch (category) {
      case 'underweight': return 'text-blue-600';
      case 'healthy': return 'text-green-600';
      case 'overweight': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);
  const hasValues = height.length > 0 && weight.length > 0;

  return (
    <div className="space-y-4">
      {/* Custom CSS for Green Sliders */}
      <style>{`
        .bmi-slider [data-slider-track] {
          background-color: #dcfce7 !important;
        }
        
        .bmi-slider [data-slider-range] {
          background-color: #16a34a !important;
        }
        
        .bmi-slider [data-slider-thumb] {
          background-color: #16a34a !important;
          border: 2px solid #15803d !important;
          box-shadow: 0 2px 4px rgba(22, 163, 74, 0.3) !important;
          transition: all 0.2s ease !important;
        }
        
        .bmi-slider [data-slider-thumb]:hover {
          background-color: #15803d !important;
          transform: scale(1.1) !important;
        }
        
        .bmi-slider [data-slider-thumb]:focus {
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.3) !important;
        }
      `}</style>

      {/* Height Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-green-700">{t.heightLabel}</Label>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{currentHeight} cm</span>
        </div>
        <div className="relative">
          <Slider
            value={[currentHeight]}
            onValueChange={onHeightChange}
            max={220}
            min={120}
            step={1}
            className="w-full bmi-slider"
          />
          <div className="flex justify-between text-xs text-green-600 mt-1">
            <span>120 cm</span>
            <span>220 cm</span>
          </div>
        </div>
      </div>

      {/* Weight Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-green-700">{t.weightLabel}</Label>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{currentWeight} kg</span>
        </div>
        <div className="relative">
          <Slider
            value={[currentWeight]}
            onValueChange={onWeightChange}
            max={200}
            min={30}
            step={1}
            className="w-full bmi-slider"
          />
          <div className="flex justify-between text-xs text-green-600 mt-1">
            <span>30 kg</span>
            <span>200 kg</span>
          </div>
        </div>
      </div>

      {/* BMI Result - Enhanced Green Theme */}
      {hasValues && (
        <Card className="mt-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-md">
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-green-800 text-lg">{t.bmiResult}</h4>
              <div className="text-4xl font-bold text-green-600 bg-white/60 rounded-lg py-2 px-4 inline-block">
                {bmi.toFixed(1)}
              </div>
              <div className={`text-base font-medium px-3 py-1 rounded-full inline-block ${getBMICategoryColor(bmiCategory)} bg-white/40`}>
                {t.bmiCategories[bmiCategory]}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-green-200">
              <div className="bg-white/60 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  {t.healthGuidance}
                </h5>
                <p className="text-sm text-green-700 leading-relaxed">
                  {t.bmiAdvice[bmiCategory]}
                </p>
              </div>
            </div>

            {/* BMI Reference Scale */}
            <div className="mt-4 bg-white/40 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs">
                <div className="text-center">
                  <div className="text-blue-600 font-medium">{'<18.5'}</div>
                  <div className="text-blue-500 text-[10px]">Ondergewicht</div>
                </div>
                <div className="text-center">
                  <div className="text-green-600 font-medium">18.5-25</div>
                  <div className="text-green-500 text-[10px]">Gezond</div>
                </div>
                <div className="text-center">
                  <div className="text-orange-600 font-medium">{'>=25'}</div>
                  <div className="text-orange-500 text-[10px]">Overgewicht</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}