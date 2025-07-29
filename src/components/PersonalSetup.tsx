import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Heart, LogIn, FileText, ArrowLeft, Globe } from 'lucide-react';

interface PersonalSetupProps {
  isEnglish: boolean;
  onComplete: (data: { 
    dashboardCode: string; 
    role: 'patient' | 'clinician'; 
    hospital?: string; 
    department?: string;
    isEnglish: boolean;
  }) => void;
  onBack: () => void;
}

// Translation system
const translations = {
  nl: {
    title: "Medische Beoordeling Setup",
    subtitle: "Kanker Patiënt Evaluatie Formulier",
    dashboardCode: "Dashboard Code",
    enterCode: "Voer uw 4-cijferige code in",
    codeHint: "Gebruik de code die u heeft ontvangen van uw zorgverlener",
    invalidCode: "Ongeldige code. Controleer uw code en probeer het opnieuw.",
    patientLogin: "Patiënt login geaccepteerd",
    providerLogin: "Zorgverlener login geaccepteerd",
    loadProfessional: "Professionele Informatie Laden",
    hospital: "Ziekenhuis/Instelling",
    department: "Afdeling/Specialisme",
    hospitalPlaceholder: "bijv. St. Antonius Ziekenhuis, UMC Utrecht",
    departmentPlaceholder: "bijv. Oncologie, Chirurgie, Interne Geneeskunde",
    professionalInfo: "Professionele Informatie",
    loaded: "✓ Geladen",
    loadedSuccess: "✓ Professionele informatie is succesvol geladen. U kunt deze velden bewerken indien nodig.",
    infoHelp: "Dit zal uw ziekenhuis en afdeling informatie invullen",
    continueAssessment: "Ga door naar Beoordeling",
    confidential: "Deze informatie helpt ons uw ervaring aan te passen en wordt vertrouwelijk behandeld.",
    backToLanguage: "Terug naar Taal Selectie",
    changeLanguage: "Taal wijzigen"
  },
  en: {
    title: "Medical Assessment Setup",
    subtitle: "Cancer Patient Evaluation Form",
    dashboardCode: "Dashboard Code",
    enterCode: "Enter your 4-digit code",
    codeHint: "Use the code provided by your healthcare provider",
    invalidCode: "Invalid code. Please check your code and try again.",
    patientLogin: "Patient login accepted",
    providerLogin: "Healthcare provider login accepted",
    loadProfessional: "Load Professional Information",
    hospital: "Hospital/Institution",
    department: "Department/Specialty",
    hospitalPlaceholder: "e.g., St. Mary's Hospital, General Medical Center",
    departmentPlaceholder: "e.g., Oncology, Surgery, Internal Medicine",
    professionalInfo: "Professional Information",
    loaded: "✓ Loaded",
    loadedSuccess: "✓ Professional information has been loaded successfully. You can edit these fields if needed.",
    infoHelp: "This will populate your hospital and department information",
    continueAssessment: "Continue to Assessment",
    confidential: "This information helps us customize your experience and is kept confidential.",
    backToLanguage: "Back to Language Selection",
    changeLanguage: "Change Language"
  }
};

export function PersonalSetup({ isEnglish, onComplete, onBack }: PersonalSetupProps) {
  const [dashboardCode, setDashboardCode] = useState('');
  const [detectedRole, setDetectedRole] = useState<'patient' | 'clinician' | null>(null);
  const [hospital, setHospital] = useState('');
  const [department, setDepartment] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);

  const t = translations[isEnglish ? 'en' : 'nl'];

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.replace(/\D/g, '').slice(0, 4);
    setDashboardCode(code);
    
    if (code.length === 4) {
      if (code.startsWith('1')) {
        setDetectedRole('patient');
        setLoginMessage(t.patientLogin);
        setIsValidCode(true);
        setHospital('');
        setDepartment('');
        setIsLoaded(false);
      } else if (code.startsWith('8')) {
        setDetectedRole('clinician');
        setLoginMessage(t.providerLogin);
        setIsValidCode(true);
      } else {
        setDetectedRole(null);
        setLoginMessage('');
        setIsValidCode(false);
      }
    } else {
      setDetectedRole(null);
      setLoginMessage('');
      setIsValidCode(false);
    }
  };

  const handleLoadProfessionalInfo = () => {
    setHospital('Catharina Ziekenhuis Eindhoven');
    setDepartment('Oncologie');
    setIsLoaded(true);
  };

  const handleSubmit = () => {
    if (isValidCode && detectedRole) {
      if (detectedRole === 'clinician' && (!hospital.trim() || !department.trim())) {
        return;
      }
      
      onComplete({
        dashboardCode,
        role: detectedRole,
        hospital: detectedRole === 'clinician' ? hospital.trim() : undefined,
        department: detectedRole === 'clinician' ? department.trim() : undefined,
        isEnglish
      });
    }
  };

  const showLoadButton = detectedRole === 'clinician' && !isLoaded;
  const isFormValid = isValidCode && (detectedRole === 'patient' || (hospital.trim() && department.trim()));

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className="text-center pb-6" style={{ backgroundColor: '#00747c10' }}>
          {/* Back to Language Selection Button */}
          <div className="absolute top-4 left-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:shadow-sm transition-shadow text-sm text-gray-600 hover:text-gray-800"
              title={t.backToLanguage}
            >
              <ArrowLeft className="w-4 h-4" />
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{t.changeLanguage}</span>
            </button>
          </div>

          {/* Language Indicator */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border text-sm">
              <Globe className="w-4 h-4" />
              <span className="font-medium">{isEnglish ? 'English' : 'Nederlands'}</span>
            </div>
          </div>

          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00747c' }}>
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl" style={{ color: '#00747c' }}>
            {t.title}
          </CardTitle>
          <p className="text-gray-600 mt-2">{t.subtitle}</p>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Dashboard Code Input */}
          <div className="space-y-3">
            <Label htmlFor="code" className="text-lg font-medium">
              {t.dashboardCode}
            </Label>
            <Input
              id="code"
              placeholder={t.enterCode}
              value={dashboardCode}
              onChange={handleCodeChange}
              className="text-2xl text-center p-4 border-gray-200 focus:border-teal-500 transition-colors font-mono tracking-widest"
              maxLength={4}
            />
            <p className="text-sm text-gray-500 text-center">{t.codeHint}</p>
            
            {/* Login Status Message */}
            {loginMessage && (
              <div className={`p-3 rounded-lg text-center font-medium ${
                detectedRole === 'patient' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'bg-green-100 text-green-800 border border-green-200'
              }`}>
                {loginMessage}
              </div>
            )}

            {dashboardCode.length === 4 && !isValidCode && (
              <div className="p-3 rounded-lg text-center font-medium bg-red-100 text-red-800 border border-red-200">
                {t.invalidCode}
              </div>
            )}
          </div>

          {/* Clinician Professional Information */}
          {detectedRole === 'clinician' && (
            <div className="space-y-4 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5" style={{ color: '#00747c' }} />
                <Label className="font-medium" style={{ color: '#00747c' }}>
                  {t.professionalInfo}
                </Label>
                {isLoaded && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-auto font-medium">
                    {t.loaded}
                  </span>
                )}
              </div>

              {showLoadButton && (
                <div className="mb-4">
                  <button
                    onClick={handleLoadProfessionalInfo}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md"
                    style={{ backgroundColor: '#00747c' }}
                  >
                    <FileText className="w-4 h-4" />
                    {t.loadProfessional}
                  </button>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    {t.infoHelp}
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="hospital" className="text-base font-medium">
                    {t.hospital}
                  </Label>
                  <Input
                    id="hospital"
                    placeholder={t.hospitalPlaceholder}
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="mt-1 border-gray-200 focus:border-teal-500 transition-colors"
                  />
                </div>
                
                <div>
                  <Label htmlFor="department" className="text-base font-medium">
                    {t.department}
                  </Label>
                  <Input
                    id="department"
                    placeholder={t.departmentPlaceholder}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="mt-1 border-gray-200 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>
              
              {isLoaded && (
                <div className="text-xs text-green-700 bg-green-100 border border-green-200 p-3 rounded-lg">
                  <p>{t.loadedSuccess}</p>
                </div>
              )}
            </div>
          )}

          {/* Continue Button */}
          {isValidCode && (
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full py-3 px-6 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-md"
                style={{ backgroundColor: '#00747c' }}
              >
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  {t.continueAssessment}
                </div>
              </button>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 pt-2">
            {t.confidential}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}