import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { ScrollArea } from './components/ui/scroll-area';
import { Separator } from './components/ui/separator';
import { HelpTooltip } from './components/HelpTooltip';
import { AgePicker } from './components/AgePicker';
import { BMICalculator } from './components/BMICalculator';
import { LanguageSelection } from './components/LanguageSelection';
import { PersonalSetup } from './components/PersonalSetup';
import { SubmitOverview } from './components/SubmitOverview';
import { ClinicianTooltip } from './components/ClinicianTooltip';
import { User, Heart, FileText, ChevronRight, CheckCircle, Lock, Unlock, ArrowLeft, Stethoscope, Eye, Check, UserCheck, Clock, Send, Globe, Shield, Info, Users, ChevronLeft, ChevronDown, ChevronUp, Grid, List, EyeOff, Bell, Mail, X } from 'lucide-react';
import translations from './translations';
import { QUESTIONS } from './constants';
import { getSocioeconomicStatus, getDisplayName } from './utils';
import SelectionBox from './components/SelectionBox';
import CompactSelectionBox from './components/CompactSelectionBox';

type Section = 'language' | 'setup' | 'welcome' | 'question' | 'form' | 'overview' | 'complete';

interface UserData {
  dashboardCode: string;
  role: 'patient' | 'clinician';
  hospital?: string;
  department?: string;
  isEnglish: boolean;
}

interface ClinicianEntry {
  clinicianName: string;
  clinicianAvatar: string;
  timestamp: Date;
  section: string;
  hospital?: string;
  department?: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('language');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<boolean>(false); // false = Dutch, true = English
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [height, setHeight] = useState<number[]>([]);
  const [weight, setWeight] = useState<number[]>([]);
  const [age, setAge] = useState('50');
  const [sex, setSex] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [diabetes, setDiabetes] = useState(''); // In patient info
  const [asaScore, setAsaScore] = useState(''); // In clinical
  const [histology, setHistology] = useState('');
  const [tumorLocation, setTumorLocation] = useState('');
  const [chemotherapy, setChemotherapy] = useState('');
  const [hospitalType, setHospitalType] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [clinicianEntries, setClinicianEntries] = useState<ClinicianEntry[]>([]);
  const [expandedInfo, setExpandedInfo] = useState<Record<string, boolean>>({});
  const [clinicianNotified, setClinicianNotified] = useState(false);

  // Get translations
  const t = translations[userData?.isEnglish ? 'en' : 'nl'];

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  // Check if clinical section should be blurred for patients
  const shouldBlurClinicalSection = () => {
    if (userData?.role !== 'patient') return false;
    // Check if any clinical questions are answered
    const hasAnyAnswered = asaScore || histology || tumorLocation || chemotherapy || hospitalType;
    return !hasAnyAnswered;
  };

  // Track when a clinician makes changes
  const trackClinicianEntry = (section: string) => {
    if (userData?.role === 'clinician') {
      const existingEntryIndex = clinicianEntries.findIndex(entry => entry.section === section);
      const newEntry: ClinicianEntry = {
        clinicianName: `Zorgverlener ${userData.dashboardCode}`,
        clinicianAvatar: 'clinician-1',
        timestamp: new Date(),
        section: section,
        hospital: userData.hospital,
        department: userData.department
      };

      if (existingEntryIndex >= 0) {
        const updatedEntries = [...clinicianEntries];
        updatedEntries[existingEntryIndex] = newEntry;
        setClinicianEntries(updatedEntries);
      } else {
        setClinicianEntries([...clinicianEntries, newEntry]);
      }
    }
  };

  // Safe postal code validation without regex
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();
    
    // Clean the input - keep only numbers, letters, and spaces
    let cleanValue = '';
    for (let i = 0; i < inputValue.length; i++) {
      const char = inputValue[i];
      if ((char >= '0' && char <= '9') || (char >= 'A' && char <= 'Z') || char === ' ') {
        cleanValue += char;
      }
    }
    
    // Remove all spaces first
    let noSpaces = cleanValue.replace(/ /g, '');
    
    // Build the formatted postal code
    let formatted = '';
    
    for (let i = 0; i < noSpaces.length && formatted.length < 7; i++) {
      const char = noSpaces[i];
      
      if (i < 4) {
        // First 4 characters should be numbers
        if (char >= '0' && char <= '9') {
          formatted += char;
        }
      } else if (i === 4) {
        // Add space after 4th number
        if (formatted.length === 4) {
          formatted += ' ';
        }
        // 5th character should be a letter
        if (char >= 'A' && char <= 'Z') {
          formatted += char;
        }
      } else if (i === 5) {
        // 6th character should be a letter
        if (char >= 'A' && char <= 'Z') {
          formatted += char;
        }
      }
    }
    
    setPostalCode(formatted);
  };

  const getCompletionStatus = () => {
    // Only patient and clinical sections remain
    const patientComplete = sex && age && postalCode && diabetes && (height.length > 0 && weight.length > 0);
    const clinicalComplete = histology && tumorLocation && chemotherapy && hospitalType && asaScore;
    
    return {
      patient: !!patientComplete,
      clinical: !!clinicalComplete
    };
  };

  const completionStatus = getCompletionStatus();

  // Check if all sections are complete
  const isAllComplete = completionStatus.patient && completionStatus.clinical;

  // Check if patient can request clinician review
  const canRequestClinicianReview = userData?.role === 'patient' && completionStatus.patient;

  // Handle patient notification to clinician
  const handleNotifyClinician = () => {
    const currentTime = new Date().toLocaleString(userData?.isEnglish ? 'en-US' : 'nl-NL');
    const patientName = getDisplayName(userData?.dashboardCode || '');
    
    setClinicianNotified(true);
    
    // Show success message
    alert(`${t.notificationSentMessage}\n\n${t.notificationDetails}\n• ${t.patientCompleted}\n• ${t.awaitingClinical}\n• ${t.submissionTime}: ${currentTime}`);
  };

  // Simple gender icons
  const MaleIcon = () => (
    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
      M
    </div>
  );

  const FemaleIcon = () => (
    <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-xl">
      F
    </div>
  );

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

  // Handle selection with unselect capability
  const handleSelection = (currentValue: string, newValue: string, setter: (value: string) => void, section?: string) => {
    if (currentValue === newValue) {
      setter('');
    } else {
      setter(newValue);
      if (section) {
        trackClinicianEntry(section);
      }
    }
  };

  // Handle send to clinician request
  const handleSendToClinicianReview = () => {
    alert(`${getDisplayName(userData?.dashboardCode || '')} heeft hun patiëntinformatie voltooid. Een melding is verstuurd naar het zorgteam voor het invullen van de klinische gegevens.`);
  };

  // Handle back to language selection
  const handleBackToLanguageSelection = () => {
    // Reset all form data when going back to language selection
    setUserData(null);
    setCurrentQuestionIndex(0);
    setHeight([]);
    setWeight([]);
    setAge('50');
    setSex('');
    setPostalCode('');
    setDiabetes('');
    setAsaScore('');
    setHistology('');
    setTumorLocation('');
    setChemotherapy('');
    setHospitalType('');
    setIsLocked(false);
    setClinicianEntries([]);
    setExpandedInfo({});
    setClinicianNotified(false);
    setActiveSection('language');
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setActiveSection('overview');
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    switch (currentQuestion.id) {
      case 'gender': return !!sex;
      case 'age': return !!age;
      case 'bmi': return height.length > 0 && weight.length > 0;
      case 'postal': return !!postalCode;
      case 'diabetes': return !!diabetes;
      case 'asa': return !!asaScore;
      case 'histology': return !!histology;
      case 'tumor': return !!tumorLocation;
      case 'chemo': return !!chemotherapy;
      case 'hospital': return !!hospitalType;
      default: return false;
    }
  };

  // Get answered questions count
  const getAnsweredQuestionsCount = () => {
    let count = 0;
    if (sex) count++;
    if (age) count++;
    if (height.length > 0 && weight.length > 0) count++;
    if (postalCode) count++;
    if (diabetes) count++;
    if (asaScore) count++;
    if (histology) count++;
    if (tumorLocation) count++;
    if (chemotherapy) count++;
    if (hospitalType) count++;
    return count;
  };

  // Clinical Section Blur Wrapper for Patients
  const ClinicalSectionWrapper = ({ children }: { children: React.ReactNode }) => {
    const shouldBlur = shouldBlurClinicalSection();
    
    if (!shouldBlur) return <>{children}</>;

    return (
      <div className="relative">
        <div className="blur-md transition-all duration-300 pointer-events-none select-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm">
          <div className="text-center p-6 bg-white/95 rounded-lg shadow-lg border max-w-md">
            <EyeOff className="w-8 h-8 text-gray-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Klinische Gegevens</h3>
            <p className="text-sm font-medium text-gray-700">{t.waitingForClinician}</p>
          </div>
        </div>
      </div>
    );
  };

  // Bottom Notification Banner Component
  const BottomNotificationBanner = () => {
    if (userData?.role !== 'patient' || !canRequestClinicianReview) return null;

    if (clinicianNotified) {
      return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 shadow-2xl animate-in slide-in-from-bottom-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t.bottomNotificationSent}</h3>
                <p className="text-sm text-green-100">{t.bottomNotificationSentMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setClinicianNotified(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 shadow-2xl animate-in slide-in-from-bottom-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t.bottomNotificationTitle}</h3>
              <p className="text-sm text-blue-100">{t.bottomNotificationMessage}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleNotifyClinician}
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 rounded-lg transition-colors font-medium shadow-lg"
            >
              <Mail className="w-4 h-4" />
              {t.bottomNotificationButton}
            </button>
            <button
              onClick={() => setClinicianNotified(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Clinician info component
  const ClinicianInfo = ({ section }: { section: string }) => {
    const entry = clinicianEntries.find(e => e.section === section);
    if (!entry || userData?.role !== 'patient') return null;

    const avatarInfo = getAvatarComponent(entry.clinicianAvatar);
    
    return (
      <div className="bg-gradient-to-r from-teal-100 to-blue-100 border-2 border-teal-300 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ClinicianTooltip clinician={entry}>
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center cursor-help">
              <div className={`${avatarInfo.color}`}>
                {React.createElement(avatarInfo.component, { className: "w-5 h-5" })}
              </div>
            </div>
          </ClinicianTooltip>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <UserCheck className="w-4 h-4 text-teal-700" />
              <span className="font-semibold text-teal-900">
                {t.completedBy} {entry.clinicianName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-teal-700">
              <Clock className="w-3 h-3" />
              <span>
                {entry.timestamp.toLocaleDateString()} om {entry.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    setActiveSection('overview');
  };

  // Language Selection Screen
  if (activeSection === 'language') {
    return (
      <LanguageSelection
        onLanguageSelect={(isEnglish) => {
          setSelectedLanguage(isEnglish);
          setActiveSection('setup');
        }}
      />
    );
  }

  if (activeSection === 'setup') {
    return (
      <PersonalSetup
        isEnglish={selectedLanguage}
        onComplete={(data) => {
          // Make sure to use the pre-selected language
          setUserData({...data, isEnglish: selectedLanguage});
          setActiveSection('welcome');
        }}
        onBack={handleBackToLanguageSelection}
      />
    );
  }

  if (activeSection === 'overview') {
    return (
      <SubmitOverview
        userData={userData}
        formData={{
          sex,
          age,
          height: height.length > 0 ? height[0] : 0,
          weight: weight.length > 0 ? weight[0] : 0,
          postalCode,
          diabetes,
          asaScore,
          histology,
          tumorLocation,
          chemotherapy,
          hospitalType
        }}
        clinicianEntries={clinicianEntries}
        getSocioeconomicStatus={getSocioeconomicStatus}
        onBack={() => setActiveSection('form')}
        onEdit={() => setActiveSection('form')}
        onSubmit={() => setActiveSection('complete')}
        translations={t}
        onLanguageToggle={() => setUserData({...userData, isEnglish: !userData.isEnglish})}
      />
    );
  }

  if (activeSection === 'complete') {
    const submissionId = `QST-${Date.now()}`;
    const submissionDate = new Date().toLocaleDateString(userData.isEnglish ? 'en-US' : 'nl-NL');
    const submissionTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-green-50 to-teal-50">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl mb-2 text-green-800">
              {t.submissionComplete}
            </CardTitle>
            <p className="text-green-700">{t.submissionCompleteDesc}</p>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-6">
              
              {/* Thank you message */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{t.submissionThankYou}</h3>
                <p className="text-gray-600 leading-relaxed">{t.submissionNext}</p>
              </div>

              <Separator />

              {/* Submission details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.submissionReference}</Label>
                    <p className="text-lg font-mono text-gray-800">{submissionId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">{t.submissionDateTime}</Label>
                    <p className="text-lg text-gray-800">{submissionDate} {submissionTime}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    // Reset all form data for new questionnaire
                    setCurrentQuestionIndex(0);
                    setHeight([]);
                    setWeight([]);
                    setAge('50');
                    setSex('');
                    setPostalCode('');
                    setDiabetes('');
                    setAsaScore('');
                    setHistology('');
                    setTumorLocation('');
                    setChemotherapy('');
                    setHospitalType('');
                    setIsLocked(false);
                    setClinicianEntries([]);
                    setExpandedInfo({});
                    setClinicianNotified(false);
                    setActiveSection('welcome');
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {t.newQuestionnaire}
                </button>
                
                <button
                  onClick={handleBackToLanguageSelection}
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#00747c' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.returnToDashboard}
                </button>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeSection === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-5xl shadow-xl border-0">
          <CardHeader className="text-center pb-6" style={{ backgroundColor: '#00747c10' }}>
            <CardTitle className="flex items-center justify-center gap-3 text-2xl mb-2" style={{ color: '#00747c' }}>
              <Heart className="w-8 h-8" />
              {t.welcomeTitle}
            </CardTitle>
            <p className="text-gray-600">{t.welcomeSubtitle}</p>
            <p className="text-sm text-gray-500 mt-2">
              {t.welcome} {userData ? `, ${getDisplayName(userData.dashboardCode)}` : ''}!
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <ScrollArea className="h-[70vh]">
              <div className="space-y-8 max-w-4xl mx-auto">
                
                {/* About Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Info className="w-5 h-5" style={{ color: '#00747c' }} />
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: '#00747c' }}>{t.aboutTitle}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{t.aboutText}</p>
                </div>

                {/* What to Expect */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: '#00747c' }}>{t.whatToExpectTitle}</h3>
                  </div>
                  <ul className="space-y-3">
                    {t.whatToExpectItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sections Overview */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: '#00747c' }}>{t.sectionsTitle}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                      <h4 className="font-semibold text-yellow-800 mb-2">{t.section1Title}</h4>
                      <p className="text-sm text-yellow-700">{t.section1Text}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-orange-200 bg-orange-50">
                      <h4 className="font-semibold text-orange-800 mb-2">{t.section2Title}</h4>
                      <p className="text-sm text-orange-700">{t.section2Text}</p>
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: '#00747c' }}>{t.privacyTitle}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{t.privacyText}</p>
                </div>

                {/* Support */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: '#00747c' }}>{t.supportTitle}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{t.supportText}</p>
                </div>

                {/* Ready to Begin */}
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl border border-teal-200">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#00747c' }}>{t.readyTitle}</h3>
                  <p className="text-gray-700 mb-6">{t.readyText}</p>
                  
                  <div className="text-center">
                    <button
                      onClick={() => setActiveSection('form')}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white hover:opacity-90 transition-opacity shadow-md text-lg font-medium"
                      style={{ backgroundColor: '#00747c' }}
                    >
                      <Heart className="w-5 h-5" />
                      {t.startButton}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userData) return null;

  // Static Form View
  if (activeSection === 'form') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl mx-auto p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <h1 className="text-2xl lg:text-3xl mb-2" style={{ color: '#00747c' }}>
                {t.title}
              </h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <button
                onClick={() => setActiveSection('question')}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:shadow-sm transition-shadow text-sm"
              >
                <List className="w-4 h-4" />
                {t.switchToQuestions}
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setUserData({...userData, isEnglish: !userData.isEnglish})}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:shadow-sm transition-shadow text-sm"
              >
                <Globe className="w-4 h-4" />
                {userData.isEnglish ? 'NL' : 'EN'}
              </button>

              {/* User Info */}
              <button
                onClick={() => setActiveSection('setup')}
                className="hidden sm:flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-teal-600">
                  {userData.role === 'patient' ? 
                    <User className="w-8 h-8" /> : 
                    <Stethoscope className="w-8 h-8" />
                  }
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{getDisplayName(userData.dashboardCode)}</p>
                  <p className="text-xs text-gray-500 capitalize">{userData.role === 'patient' ? 'Patiënt' : 'Zorgverlener'}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400" />
              </button>

              {/* Lock Toggle for Clinicians */}
              {userData?.role === 'clinician' && (
                <button
                  onClick={() => setIsLocked(!isLocked)}
                  className={`px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
                    isLocked ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                  }`}
                >
                  {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  <span className="text-xs">{isLocked ? t.locked : t.unlocked}</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: '#00747c' }}>
                {t.formView}
              </h2>
              <div className="text-sm text-gray-600">
                {getAnsweredQuestionsCount()}/{QUESTIONS.length} {t.completed}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(getAnsweredQuestionsCount() / QUESTIONS.length) * 100}%`,
                  backgroundColor: '#00747c'
                }}
              />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Patient Questions (Left) */}
            <Card className="h-fit">
              <CardHeader className="bg-yellow-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t.patientInfo}</CardTitle>
                    <p className="text-sm text-gray-600">5 {t.patientQuestions.toLowerCase()}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {/* Gender */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="font-medium">{t.questionTitles.gender}</Label>
                    <HelpTooltip content={t.genderInfo} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <CompactSelectionBox
                      isSelected={sex === 'male'}
                      onClick={() => {
                        if (!isLocked) {
                          handleSelection(sex, 'male', setSex, 'patient');
                        }
                      }}
                      disabled={isLocked}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          M
                        </div>
                        <span>{t.male}</span>
                      </div>
                    </CompactSelectionBox>
                    <CompactSelectionBox
                      isSelected={sex === 'female'}
                      onClick={() => {
                        if (!isLocked) {
                          handleSelection(sex, 'female', setSex, 'patient');
                        }
                      }}
                      disabled={isLocked}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-white text-xs font-bold">
                          F
                        </div>
                        <span>{t.female}</span>
                      </div>
                    </CompactSelectionBox>
                  </div>
                </div>

                <Separator />

                {/* Age */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="font-medium">{t.questionTitles.age}</Label>
                    <HelpTooltip content={t.ageInfo} />
                  </div>
                  <div className="flex items-center gap-3">
                    {!isLocked ? (
                      <AgePicker 
                        value={age} 
                        onChange={(value) => {
                          setAge(value);
                          trackClinicianEntry('patient');
                        }} 
                      />
                    ) : (
                      <div className="w-24 h-16 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center opacity-60">
                        <span className="text-lg font-semibold text-gray-500">{age}</span>
                      </div>
                    )}
                    <span className="text-sm text-gray-600">{t.yearsOld}</span>
                  </div>
                </div>

                <Separator />

                {/* BMI */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="font-medium">{t.questionTitles.bmi}</Label>
                    <HelpTooltip content={t.bmiInfo} />
                  </div>
                  {!isLocked ? (
                    <BMICalculator
                      height={height}
                      weight={weight}
                      onHeightChange={(value) => {
                        setHeight(value);
                        trackClinicianEntry('patient');
                      }}
                      onWeightChange={(value) => {
                        setWeight(value);
                        trackClinicianEntry('patient');
                      }}
                      isEnglish={userData?.isEnglish}
                    />
                  ) : (
                    <div className="opacity-60 pointer-events-none">
                      <BMICalculator
                        height={height}
                        weight={weight}
                        onHeightChange={() => {}}
                        onWeightChange={() => {}}
                        isEnglish={userData?.isEnglish}
                      />
                    </div>
                  )}
                </div>

                <Separator />

                {/* Postal Code */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="font-medium">{t.questionTitles.postal}</Label>
                    <HelpTooltip content={t.postalInfo} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      placeholder="1234 AB"
                      value={postalCode}
                      onChange={!isLocked ? (e) => {
                        handlePostalCodeChange(e);
                        trackClinicianEntry('patient');
                      } : undefined}
                      disabled={isLocked}
                      className="max-w-xs"
                    />
                    {userData?.role === 'clinician' && postalCode && (
                      <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
                        {getSocioeconomicStatus(postalCode)} {t.ses}
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Diabetes */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="font-medium">{t.questionTitles.diabetes}</Label>
                    <HelpTooltip content={t.diabetesInfo} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <CompactSelectionBox
                      isSelected={diabetes === 'yes'}
                      onClick={() => {
                        if (!isLocked) {
                          handleSelection(diabetes, 'yes', setDiabetes, 'patient');
                        }
                      }}
                      disabled={isLocked}
                    >
                      {t.diabetesYes}
                    </CompactSelectionBox>
                    <CompactSelectionBox
                      isSelected={diabetes === 'no'}
                      onClick={() => {
                        if (!isLocked) {
                          handleSelection(diabetes, 'no', setDiabetes, 'patient');
                        }
                      }}
                      disabled={isLocked}
                    >
                      {t.diabetesNo}
                    </CompactSelectionBox>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clinical Questions (Right) */}
            <Card className="h-fit">
              <CardHeader className="bg-orange-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t.clinicalData}</CardTitle>
                    <p className="text-sm text-gray-600">5 {t.clinicalQuestions.toLowerCase()}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {userData?.role === 'patient' && (
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 mb-6">
                    <div className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-orange-600 mt-0.5" />
                      <p className="text-sm text-orange-800">
                        {t.clinicalViewOnly}
                      </p>
                    </div>
                  </div>
                )}

                <ClinicalSectionWrapper>
                  {/* ASA Score */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{t.questionTitles.asa}</Label>
                      <HelpTooltip content={t.asaInfo} />
                    </div>
                    <div className="space-y-2">
                      {[
                        { value: 'I', label: t.asaI },
                        { value: 'II', label: t.asaII },
                        { value: 'III', label: t.asaIII },
                        { value: 'IV', label: t.asaIV },
                        { value: 'V', label: t.asaV }
                      ].map((option) => (
                        <CompactSelectionBox
                          key={option.value}
                          isSelected={asaScore === option.value}
                          onClick={() => {
                            if (userData?.role === 'clinician') {
                              handleSelection(asaScore, option.value, setAsaScore, 'clinical');
                            }
                          }}
                          disabled={userData?.role === 'patient'}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-teal-700">{option.value}</span>
                            </div>
                            <span className="text-sm">{option.label}</span>
                          </div>
                        </CompactSelectionBox>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Histology */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{t.questionTitles.histology}</Label>
                      <HelpTooltip content={t.histologyInfo} />
                    </div>
                    <div className="space-y-2">
                      {[
                        { value: 'adenocarcinoma', label: t.adenocarcinoma },
                        { value: 'squamous', label: t.squamous }
                      ].map((option) => (
                        <CompactSelectionBox
                          key={option.value}
                          isSelected={histology === option.value}
                          onClick={() => {
                            if (userData?.role === 'clinician') {
                              handleSelection(histology, option.value, setHistology, 'clinical');
                            }
                          }}
                          disabled={userData?.role === 'patient'}
                        >
                          {option.label}
                        </CompactSelectionBox>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Tumor Location */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{t.questionTitles.tumor}</Label>
                      <HelpTooltip content={t.tumorInfo} />
                    </div>
                    <div className="space-y-2">
                      {[
                        { value: 'cervical', label: t.cervical },
                        { value: 'middle', label: t.middle },
                        { value: 'distal', label: t.distal }
                      ].map((option) => (
                        <CompactSelectionBox
                          key={option.value}
                          isSelected={tumorLocation === option.value}
                          onClick={() => {
                            if (userData?.role === 'clinician') {
                              handleSelection(tumorLocation, option.value, setTumorLocation, 'clinical');
                            }
                          }}
                          disabled={userData?.role === 'patient'}
                        >
                          {option.label}
                        </CompactSelectionBox>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Chemotherapy */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{t.questionTitles.chemo}</Label>
                      <HelpTooltip content={t.chemoInfo} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <CompactSelectionBox
                        isSelected={chemotherapy === 'yes'}
                        onClick={() => {
                          if (userData?.role === 'clinician') {
                            handleSelection(chemotherapy, 'yes', setChemotherapy, 'clinical');
                          }
                        }}
                        disabled={userData?.role === 'patient'}
                      >
                        {t.chemotherapyYes}
                      </CompactSelectionBox>
                      <CompactSelectionBox
                        isSelected={chemotherapy === 'no'}
                        onClick={() => {
                          if (userData?.role === 'clinician') {
                            handleSelection(chemotherapy, 'no', setChemotherapy, 'clinical');
                          }
                        }}
                        disabled={userData?.role === 'patient'}
                      >
                        {t.chemotherapyNo}
                      </CompactSelectionBox>
                    </div>
                  </div>

                  <Separator />

                  {/* Hospital Volume */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{t.questionTitles.hospital}</Label>
                      <HelpTooltip content={t.hospitalInfo} />
                    </div>
                    <div className="space-y-2">
                      {[
                        { value: 'low', label: t.lowVolume },
                        { value: 'medium', label: t.mediumVolume },
                        { value: 'high', label: t.highVolume },
                        { value: 'unknown', label: t.unknown }
                      ].map((option) => (
                        <CompactSelectionBox
                          key={option.value}
                          isSelected={hospitalType === option.value}
                          onClick={() => {
                            if (userData?.role === 'clinician') {
                              handleSelection(hospitalType, option.value, setHospitalType, 'clinical');
                            }
                          }}
                          disabled={userData?.role === 'patient'}
                        >
                          {option.label}
                        </CompactSelectionBox>
                      ))}
                    </div>
                  </div>
                </ClinicalSectionWrapper>
              </CardContent>
            </Card>
          </div>

          {/* Submit Section */}
          <div className="mt-8 flex justify-center" style={{ marginBottom: canRequestClinicianReview ? '120px' : '0' }}>
            {isAllComplete ? (
              <button 
                onClick={() => setActiveSection('overview')}
                className="flex items-center gap-2 px-8 py-4 rounded-lg text-white hover:opacity-90 transition-opacity text-lg font-medium"
                style={{ backgroundColor: '#00747c' }}
              >
                <Send className="w-5 h-5" />
                {t.submit}
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">{t.completeAll}</p>
                <button 
                  disabled
                  className="flex items-center gap-2 px-8 py-4 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed text-lg font-medium"
                >
                  <Send className="w-5 h-5" />
                  {t.submit}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Notification Banner */}
        <BottomNotificationBanner />
      </div>
    );
  }

  // Collapsible Information Component for Header
  const CollapsibleInfoHeader = ({ questionId, info, sectionColor }: { 
    questionId: string, 
    info: string,
    sectionColor: string 
  }) => {
    const isExpanded = expandedInfo[questionId] || false;
    const bgColor = sectionColor === '#FCD34D' ? 'bg-yellow-50' : 'bg-orange-50';
    const textColor = sectionColor === '#FCD34D' ? 'text-yellow-700' : 'text-orange-700';
    const borderColor = sectionColor === '#FCD34D' ? 'border-yellow-200' : 'border-orange-200';
    const buttonBg = sectionColor === '#FCD34D' ? 'bg-yellow-100 hover:bg-yellow-200' : 'bg-orange-100 hover:bg-orange-200';
    const buttonText = sectionColor === '#FCD34D' ? 'text-yellow-700' : 'text-orange-700';
    
    return (
      <div className="mt-3">
        <button
          onClick={() => setExpandedInfo(prev => ({ ...prev, [questionId]: !prev[questionId] }))}
          className={`flex items-center gap-2 px-3 py-2 ${buttonBg} rounded-lg border ${borderColor} transition-colors text-sm ${buttonText}`}
        >
          <Info className="w-4 h-4" />
          <span>{t.aboutThisQuestion}</span>
          <span className="text-xs">({isExpanded ? t.hideInfo : t.showMoreInfo})</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {isExpanded && (
          <div className={`mt-3 ${bgColor} p-4 rounded-lg border ${borderColor} animate-in slide-in-from-top-2`}>
            <p className={`${textColor} leading-relaxed whitespace-pre-line text-sm`}>{info}</p>
          </div>
        )}
      </div>
    );
  };

  // Get question information based on question ID
  const getQuestionInfo = (questionId: string) => {
    switch (questionId) {
      case 'gender': return t.genderInfo;
      case 'age': return t.ageInfo;
      case 'bmi': return t.bmiInfo;
      case 'postal': 
        if (userData?.role === 'clinician' && postalCode) {
          return t.postalClinicianInfo;
        }
        return t.postalInfo;
      case 'diabetes': return t.diabetesInfo;
      case 'asa': return t.asaInfo;
      case 'histology': return t.histologyInfo;
      case 'tumor': return t.tumorInfo;
      case 'chemo': return t.chemoInfo;
      case 'hospital': return t.hospitalInfo;
      default: return '';
    }
  };

  // Individual Question View
  if (activeSection === 'question') {
    const renderQuestionContent = () => {
      switch (currentQuestion.id) {
        case 'gender':
          return (
            <div className="space-y-6">
                <p className="text-lg text-gray-700">{t.birthGender}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <SelectionBox
                    isSelected={sex === 'male'}
                    onClick={() => {
                      if (!isLocked) {
                        handleSelection(sex, 'male', setSex, 'patient');
                      }
                    }}
                    disabled={isLocked}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                        <MaleIcon />
                      </div>
                      <div>
                        <Label className="cursor-pointer text-base font-medium">{t.male}</Label>
                        <p className="text-sm text-gray-500 mt-0.5">{t.biologicalMale}</p>
                      </div>
                    </div>
                  </SelectionBox>
                  
                  <SelectionBox
                    isSelected={sex === 'female'}
                    onClick={() => {
                      if (!isLocked) {
                        handleSelection(sex, 'female', setSex, 'patient');
                      }
                    }}
                    disabled={isLocked}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center">
                        <FemaleIcon />
                      </div>
                      <div>
                        <Label className="cursor-pointer text-base font-medium">{t.female}</Label>
                        <p className="text-sm text-gray-500 mt-0.5">{t.biologicalFemale}</p>
                      </div>
                    </div>
                  </SelectionBox>
                </div>
                {sex && (
                  <p className="text-xs text-gray-500 italic">{t.unselectHint}</p>
                )}
              </div>
          );

        case 'age':
          return (
            <div className="space-y-6">
                <p className="text-lg text-gray-700">{t.age}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {!isLocked ? (
                    <AgePicker 
                      value={age} 
                      onChange={(value) => {
                        setAge(value);
                        trackClinicianEntry('patient');
                      }} 
                    />
                  ) : (
                    <div className="w-32 h-20 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center justify-center opacity-60">
                      <span className="text-2xl font-semibold text-gray-500">{age}</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">
                    {!isLocked ? t.ageHelp : t.lockedByClinician}
                  </p>
                </div>
              </div>
          );

        case 'bmi':
          return (
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Label className="text-lg font-medium">{t.bmiCalculator}</Label>
                  <HelpTooltip content={t.bmiHelp} />
                </div>
                <p className="text-sm text-gray-600">
                  {!isLocked ? t.bmiDesc : t.bmiLocked}
                </p>
                
                {!isLocked ? (
                  <BMICalculator
                    height={height}
                    weight={weight}
                    onHeightChange={(value) => {
                      setHeight(value);
                      trackClinicianEntry('patient');
                    }}
                    onWeightChange={(value) => {
                      setWeight(value);
                      trackClinicianEntry('patient');
                    }}
                    isEnglish={userData?.isEnglish}
                  />
                ) : (
                  <div className="opacity-60 pointer-events-none">
                    <BMICalculator
                      height={height}
                      weight={weight}
                      onHeightChange={() => {}}
                      onWeightChange={() => {}}
                      isEnglish={userData?.isEnglish}
                    />
                  </div>
                )}
              </div>
          );

        case 'postal':
          return (
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Label htmlFor="postal" className="text-lg font-medium">{t.postalCode}</Label>
                  <HelpTooltip content="Deze informatie helpt ons uw geografische locatie te begrijpen voor medische en onderzoeksdoeleinden." />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    id="postal"
                    placeholder="1234 AB"
                    value={postalCode}
                    onChange={!isLocked ? (e) => {
                      handlePostalCodeChange(e);
                      trackClinicianEntry('patient');
                    } : undefined}
                    disabled={isLocked}
                    className={`max-w-xs transition-colors ${
                      !isLocked ? 'hover:border-gray-400' : 'opacity-60 cursor-not-allowed'
                    }`}
                  />
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-500">{t.postalFormat}</p>
                    {userData?.role === 'clinician' && postalCode && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
                          {getSocioeconomicStatus(postalCode)} {t.ses}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
          );

        case 'diabetes':
          return (
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Label className="text-lg font-medium">{t.diabetes}</Label>
                  <HelpTooltip content="Diabetes beïnvloedt hoe uw lichaam bloedsuiker verwerkt en kan invloed hebben op kankerbehandelingsplannen." />
                </div>
                <p className="text-gray-700 mb-3">{t.diabetesQuestion}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <SelectionBox
                    isSelected={diabetes === 'yes'}
                    onClick={() => {
                      if (!isLocked) {
                        handleSelection(diabetes, 'yes', setDiabetes, 'patient');
                      }
                    }}
                    disabled={isLocked}
                  >
                    <Label className="cursor-pointer">{t.diabetesYes}</Label>
                  </SelectionBox>
                  
                  <SelectionBox
                    isSelected={diabetes === 'no'}
                    onClick={() => {
                      if (!isLocked) {
                        handleSelection(diabetes, 'no', setDiabetes, 'patient');
                      }
                    }}
                    disabled={isLocked}
                  >
                    <Label className="cursor-pointer">{t.diabetesNo}</Label>
                  </SelectionBox>
                </div>
                {diabetes && (
                  <p className="text-xs text-gray-500 italic">{t.unselectHint}</p>
                )}
              </div>
          );

        case 'asa':
          return (
            <div className="space-y-6">
              {userData?.role === 'patient' && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-orange-600 mt-0.5" />
                    <p className="text-sm text-orange-800">
                      {t.clinicalViewOnly}
                    </p>
                  </div>
                </div>
              )}
              
              <ClinicalSectionWrapper>
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Label className="text-lg font-medium">{t.asaScore}</Label>
                    <HelpTooltip content="De ASA-score helpt artsen uw algemene fysieke conditie voor chirurgie te begrijpen." />
                  </div>
                  
                  <p className="text-gray-700 mb-3">{t.asaClinical}</p>
                  <div className="space-y-4">
                    {[
                      { value: 'I', label: t.asaI, desc: t.asaIDesc },
                      { value: 'II', label: t.asaII, desc: t.asaIIDesc },
                      { value: 'III', label: t.asaIII, desc: t.asaIIIDesc },
                      { value: 'IV', label: t.asaIV, desc: t.asaIVDesc },
                      { value: 'V', label: t.asaV, desc: t.asaVDesc }
                    ].map((option) => (
                      <SelectionBox
                        key={option.value}
                        isSelected={asaScore === option.value}
                        onClick={() => {
                          if (userData?.role === 'clinician') {
                            handleSelection(asaScore, option.value, setAsaScore, 'clinical');
                          }
                        }}
                        disabled={userData?.role === 'patient'}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold text-teal-700">{option.value}</span>
                          </div>
                          <div>
                            <Label className="cursor-pointer">{option.label}</Label>
                            <p className="text-sm text-gray-500 mt-1">{option.desc}</p>
                          </div>
                        </div>
                      </SelectionBox>
                    ))}
                  </div>
                  {asaScore && userData?.role === 'clinician' && (
                    <p className="text-xs text-gray-500 italic">{t.unselectHint}</p>
                  )}
                </div>
              </ClinicalSectionWrapper>
            </div>
          );

        case 'histology':
          return (
            <div className="space-y-6">
              {userData?.role === 'patient' && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-orange-600 mt-0.5" />
                    <p className="text-sm text-orange-800">
                      {t.clinicalViewOnly}
                    </p>
                  </div>
                </div>
              )}
              
              <ClinicalSectionWrapper>
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Label className="text-lg font-medium">{t.histology}</Label>
                    <HelpTooltip content="Histologische diagnose wordt bepaald door microscopisch onderzoek van weefselmonsters." />
                  </div>
                  <p className="text-gray-700 mb-3">{t.histologyDesc}</p>
                  <div className="space-y-4">
                    {[
                      { value: 'adenocarcinoma', label: t.adenocarcinoma, desc: t.adenocarcinomaDesc },
                      { value: 'squamous', label: t.squamous, desc: t.squamousDesc }
                    ].map((option) => (
                      <SelectionBox
                        key={option.value}
                        isSelected={histology === option.value}
                        onClick={() => {
                          if (userData?.role === 'clinician') {
                            handleSelection(histology, option.value, setHistology, 'clinical');
                          }
                        }}
                        disabled={userData?.role === 'patient'}
                      >
                        <div>
                          <Label className="cursor-pointer">{option.label}</Label>
                          <p className="text-sm text-gray-500 mt-1">{option.desc}</p>
                        </div>
                      </SelectionBox>
                    ))}
                  </div>
                  {histology && userData?.role === 'clinician' && (
                    <p className="text-xs text-gray-500 italic">{t.unselectHint}</p>
                  )}
                </div>
              </ClinicalSectionWrapper>
            </div>
          );

        case 'tumor':
          return (
            <div className="space-y-6">
              {userData?.role === 'patient' && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-orange-600 mt-0.5" />
                    <p className="text-sm text-orange-800">
                      {t.clinicalViewOnly}
                    </p>
                  </div>
                </div>
              )}
              
              <ClinicalSectionWrapper>
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Label className="text-lg font-medium">{t.tumorLocation}</Label>
                    <HelpTooltip content="Tumorlocatie beïnvloedt chirurgische benadering en behandelingsplanning." />
                  </div>
                  <p className="text-gray-700 mb-3">{t.tumorLocationDesc}</p>
                  <div className="space-y-4">
                    {[
                      { value: 'cervical', label: t.cervical, desc: t.cervicalDesc },
                      { value: 'middle', label: t.middle, desc: t.middleDesc },
                      { value: 'distal', label: t.distal, desc: t.distalDesc }
                    ].map((option) => (
                      <SelectionBox
                        key={option.value}
                        isSelected={tumorLocation === option.value}
                        onClick={() => {
                          if (userData?.role === 'clinician') {
                            handleSelection(tumorLocation, option.value, setTumorLocation, 'clinical');
                          }
                        }}
                        disabled={userData?.role === 'patient'}
                      >
                        <div>
                          <Label className="cursor-pointer">{option.label}</Label>
                          <p className="text-sm text-gray-500 mt-1">{option.desc}</p>
                        </div>
                      </SelectionBox>
                    ))}
                  </div>
                  {tumorLocation && userData?.role === 'clinician' && (
                    <p className="text-xs text-gray-500 italic">{t.unselectHint}</p>
                  )}
                </div>
              </ClinicalSectionWrapper>
            </div>
          );

        case 'chemo':
          return (
            <div className="space-y-6">
              {userData?.role === 'patient' && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-orange-600 mt-0.5" />
                    <p className="text-sm text-orange-800">
                      {t.clinicalViewOnly}
                    </p>
                  </div>
                </div>
              )}
              
              <ClinicalSectionWrapper>
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Label className="text-lg font-medium">{t.chemotherapy}</Label>
                    <HelpTooltip content="Chemotherapiegeschiedenis is cruciaal voor behandelingsplanning." />
                  </div>
                  <p className="text-gray-700 mb-3">{t.chemotherapyDesc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { value: 'yes', label: t.chemotherapyYes },
                      { value: 'no', label: t.chemotherapyNo }
                    ].map((option) => (
                      <SelectionBox
                        key={option.value}
                        isSelected={chemotherapy === option.value}
                        onClick={() => {
                          if (userData?.role === 'clinician') {
                            handleSelection(chemotherapy, option.value, setChemotherapy, 'clinical');
                          }
                        }}
                        disabled={userData?.role === 'patient'}
                      >
                        <Label className="cursor-pointer">{option.label}</Label>
                      </SelectionBox>
                    ))}
                  </div>
                  {chemotherapy && userData?.role === 'clinician' && (
                    <p className="text-xs text-gray-500 italic">{t.unselectHint}</p>
                  )}
                </div>
              </ClinicalSectionWrapper>
            </div>
          );

        case 'hospital':
          return (
            <div className="space-y-6">
              {userData?.role === 'patient' && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-orange-600 mt-0.5" />
                    <p className="text-sm text-orange-800">
                      {t.clinicalViewOnly}
                    </p>
                  </div>
                </div>
              )}
              
              <ClinicalSectionWrapper>
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Label className="text-lg font-medium">{t.hospitalVolume}</Label>
                    <HelpTooltip content="Ziekenhuisvolume is geassocieerd met chirurgische uitkomsten en expertise." />
                  </div>
                  <p className="text-gray-700 mb-3">{t.hospitalVolumeDesc}</p>
                  <div className="space-y-4">
                    {[
                      { value: 'low', label: t.lowVolume, desc: t.lowVolumeDesc },
                      { value: 'medium', label: t.mediumVolume, desc: t.mediumVolumeDesc },
                      { value: 'high', label: t.highVolume, desc: t.highVolumeDesc },
                      { value: 'unknown', label: t.unknown, desc: t.unknownDesc }
                    ].map((option) => (
                      <SelectionBox
                        key={option.value}
                        isSelected={hospitalType === option.value}
                        onClick={() => {
                          if (userData?.role === 'clinician') {
                            handleSelection(hospitalType, option.value, setHospitalType, 'clinical');
                          }
                        }}
                        disabled={userData?.role === 'patient'}
                      >
                        <div>
                          <Label className="cursor-pointer">{option.label}</Label>
                          <p className="text-sm text-gray-500 mt-1">{option.desc}</p>
                        </div>
                      </SelectionBox>
                    ))}
                  </div>
                  {hospitalType && userData?.role === 'clinician' && (
                    <p className="text-xs text-gray-500 italic">{t.unselectHint}</p>
                  )}
                </div>
              </ClinicalSectionWrapper>
            </div>
          );

        default:
          return null;
      }
    };

    const IconComponent = currentQuestion.icon;
    const sectionColor = currentQuestion.section === 'patient' ? '#FCD34D' : '#FB923C';
    const sectionBg = currentQuestion.section === 'patient' ? 'bg-yellow-50' : 'bg-orange-50';

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl mx-auto p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <h1 className="text-2xl lg:text-3xl mb-2" style={{ color: '#00747c' }}>
                {t.title}
              </h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <button
                onClick={() => setActiveSection('form')}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:shadow-sm transition-shadow text-sm"
              >
                <Grid className="w-4 h-4" />
                {t.switchToForm}
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setUserData({...userData, isEnglish: !userData.isEnglish})}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:shadow-sm transition-shadow text-sm"
              >
                <Globe className="w-4 h-4" />
                {userData.isEnglish ? 'NL' : 'EN'}
              </button>

              {/* User Info */}
              <button
                onClick={() => setActiveSection('setup')}
                className="hidden sm:flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-teal-600">
                  {userData.role === 'patient' ? 
                    <User className="w-8 h-8" /> : 
                    <Stethoscope className="w-8 h-8" />
                  }
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{getDisplayName(userData.dashboardCode)}</p>
                  <p className="text-xs text-gray-500 capitalize">{userData.role === 'patient' ? 'Patiënt' : 'Zorgverlener'}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400" />
              </button>

              {/* Lock Toggle for Clinicians */}
              {userData?.role === 'clinician' && (
                <button
                  onClick={() => setIsLocked(!isLocked)}
                  className={`px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
                    isLocked ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                  }`}
                >
                  {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  <span className="text-xs">{isLocked ? t.locked : t.unlocked}</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: sectionColor }}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#00747c' }}>
                    {t.questionTitles[currentQuestion.id]}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t.questionProgress.replace('{current}', (currentQuestionIndex + 1).toString()).replace('{total}', QUESTIONS.length.toString())}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {currentQuestion.section === 'patient' ? t.patientQuestions : t.clinicalQuestions}
                </p>
                <p className="text-xs text-gray-500">
                  {getAnsweredQuestionsCount()}/{QUESTIONS.length} {t.completed}
                </p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%`,
                  backgroundColor: '#00747c'
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-l-4 shadow-lg" style={{ borderLeftColor: sectionColor }}>
            <CardHeader className={`${sectionBg} border-b`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <IconComponent className="w-6 h-6" style={{ color: sectionColor }} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{t.questionTitles[currentQuestion.id]}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {currentQuestion.section === 'patient' ? t.patientQuestions : t.clinicalQuestions}
                  </p>
                  <CollapsibleInfoHeader 
                    questionId={currentQuestion.id} 
                    info={getQuestionInfo(currentQuestion.id)} 
                    sectionColor={sectionColor}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <ClinicianInfo section={currentQuestion.section} />
              {renderQuestionContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center" style={{ marginBottom: canRequestClinicianReview ? '120px' : '0' }}>
            <button 
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-colors ${
                currentQuestionIndex === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              {t.previous}
            </button>
            
            <div className="flex items-center gap-2">
              {QUESTIONS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentQuestionIndex
                      ? 'bg-teal-500 scale-125'
                      : index < currentQuestionIndex
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNextQuestion}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#00747c' }}
            >
              {currentQuestionIndex === QUESTIONS.length - 1 ? t.submit : t.next}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex justify-center">
            {isCurrentQuestionAnswered() && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Vraag beantwoord</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Notification Banner */}
        <BottomNotificationBanner />
      </div>
    );
  }

  return null;
}