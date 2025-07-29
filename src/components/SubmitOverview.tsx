import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle2, Edit, ArrowLeft, Send, User, Stethoscope, Building, Users, Calendar, Globe } from 'lucide-react';

interface UserData {
  name: string;
  avatar: string;
  role: 'patient' | 'clinician';
  hospital?: string;
  department?: string;
}

interface ClinicianEntry {
  clinicianName: string;
  clinicianAvatar: string;
  timestamp: Date;
  section: string;
  hospital?: string;
  department?: string;
}

interface FormData {
  sex: string;
  age: string;
  height: number;
  weight: number;
  postalCode: string;
  diabetes: string;
  asaScore: string;
  histology: string;
  tumorLocation: string;
  chemotherapy: string;
  hospitalType: string;
}

interface SubmitOverviewProps {
  userData: UserData | null;
  formData: FormData;
  clinicianEntries: ClinicianEntry[];
  getSocioeconomicStatus: (postalCode: string) => string;
  onBack: () => void;
  onEdit: () => void;
  onSubmit: () => void;
  translations: any;
  onLanguageToggle: () => void;
}

export function SubmitOverview({ 
  userData, 
  formData, 
  clinicianEntries, 
  getSocioeconomicStatus, 
  onBack, 
  onEdit,
  onSubmit,
  translations: t,
  onLanguageToggle
}: SubmitOverviewProps) {
  const calculateBMI = () => {
    const heightInMeters = formData.height / 100;
    const bmi = formData.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: t.bmiCategories.underweight, color: 'bg-blue-100 text-blue-800' };
    if (bmi <= 30) return { text: t.bmiCategories.healthy, color: 'bg-green-100 text-green-800' };
    return { text: t.bmiCategories.overweight, color: 'bg-orange-100 text-orange-800' };
  };

  const getAvatarComponent = (avatarId: string) => {
    const colors = [
      'text-blue-600', 'text-green-600', 'text-purple-600', 'text-red-600',
      'text-orange-600', 'text-pink-600', 'text-indigo-600', 'text-teal-600'
    ];
    const isPatient = avatarId.startsWith('patient-');
    const colorIndex = parseInt(avatarId.split('-')[1]) - 1;
    const color = colors[colorIndex] || 'text-gray-600';
    const icon = isPatient ? User : Stethoscope;
    return { component: icon, color };
  };

  const formatValue = (key: string, value: string) => {
    const formatMap: { [key: string]: string } = {
      'male': t.valueFormat.male,
      'female': t.valueFormat.female,
      'yes': t.valueFormat.yes,
      'no': t.valueFormat.no,
      'I': t.valueFormat.asaI,
      'II': t.valueFormat.asaII,
      'III': t.valueFormat.asaIII,
      'IV': t.valueFormat.asaIV,
      'V': t.valueFormat.asaV,
      'adenocarcinoma': t.valueFormat.adenocarcinoma,
      'squamous': t.valueFormat.squamous,
      'cervical': t.valueFormat.cervical,
      'middle': t.valueFormat.middle,
      'distal': t.valueFormat.distal,
      'low': t.valueFormat.lowVolume,
      'medium': t.valueFormat.mediumVolume,
      'high': t.valueFormat.highVolume,
      'unknown': t.valueFormat.unknown
    };
    return formatMap[value] || value;
  };

  const currentBMI = parseFloat(calculateBMI());
  const bmiCategory = getBMICategory(currentBMI);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Success Header */}
        <Card className="mb-6 border-0 shadow-xl">
          <CardHeader className="text-center pb-4 relative" style={{ backgroundColor: '#10b98115' }}>
            {/* Language Toggle */}
            <button
              onClick={onLanguageToggle}
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:shadow-sm transition-shadow text-sm"
            >
              <Globe className="w-4 h-4" />
              {userData?.isEnglish ? 'NL' : 'EN'}
            </button>
            
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-800 mb-2">
              {t.submitSuccess}
            </CardTitle>
            <p className="text-green-700">
              {t.submitSuccessDesc}
            </p>
          </CardHeader>
        </Card>

        {/* Complete Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#00747c' }}>
              <CheckCircle2 className="w-6 h-6" />
              {t.completeOverview}
            </CardTitle>
            <p className="text-gray-600">{t.reviewSubmitted}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Patient Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-400"></div>
                {t.patientInfoSection}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-yellow-50 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.birthGenderLabel}</Label>
                    <p className="text-base">{formatValue('', formData.sex)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.ageLabel}</Label>
                    <p className="text-base">{formData.age} {t.yearsOld}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.postalCodeLabel}</Label>
                    <div className="flex items-center gap-2">
                      <p className="text-base">{formData.postalCode}</p>
                      {userData?.role === 'clinician' && (
                        <Badge variant="secondary" className="text-xs">
                          {getSocioeconomicStatus(formData.postalCode)} SES
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.diabetesLabel}</Label>
                    <p className="text-base">{formatValue('', formData.diabetes)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.heightWeightLabel}</Label>
                    <p className="text-base">{formData.height} cm, {formData.weight} kg</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.bmiLabel}</Label>
                    <div className="flex items-center gap-2">
                      <p className="text-base">{calculateBMI()}</p>
                      <Badge className={bmiCategory.color}>{bmiCategory.text}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />



            {/* Clinical Assessment Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-400"></div>
                {t.clinicalAssessment}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-orange-50 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.asaLabel}</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-teal-700">{formData.asaScore}</span>
                      </div>
                      <p className="text-base">{formatValue('', formData.asaScore)}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.histologyLabel}</Label>
                    <p className="text-base">{formatValue('', formData.histology)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.tumorLocationLabel}</Label>
                    <p className="text-base">{formatValue('', formData.tumorLocation)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.chemotherapyLabel}</Label>
                    <p className="text-base">{formatValue('', formData.chemotherapy)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.hospitalVolumeLabel}</Label>
                    <p className="text-base">{formatValue('', formData.hospitalType)}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Completion Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#00747c' }}>
                {t.completionSummary}
              </h3>
              <div className="space-y-4">
                {clinicianEntries.map((entry, index) => {
                  const avatarInfo = getAvatarComponent(entry.clinicianAvatar);
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                        <div className={avatarInfo.color}>
                          {React.createElement(avatarInfo.component, { className: "w-5 h-5" })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-teal-900">{entry.clinicianName}</span>
                          <span className="text-sm text-teal-700">{entry.section} {t.completedSection}</span>
                        </div>
                        {entry.hospital && entry.department && (
                          <div className="flex items-center gap-4 text-sm text-teal-600">
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              <span>{entry.hospital}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{entry.department}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm text-teal-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{entry.timestamp.toLocaleDateString()}</span>
                        </div>
                        <span>{entry.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToQuestionnaire}
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-teal-500 text-teal-700 hover:bg-teal-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              {t.editResponses}
            </button>
            
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#00747c' }}
              onClick={onSubmit}
            >
              <Send className="w-4 h-4" />
              {t.confirmSubmission}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <label className={className}>{children}</label>;
}