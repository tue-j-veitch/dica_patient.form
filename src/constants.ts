import { User, Heart, Stethoscope, Clock, MapPin, Hospital, Activity, Microscope, Navigation } from 'lucide-react';

export const QUESTIONS = [
  { id: 'gender', section: 'patient', title: 'Birth Gender', icon: User },
  { id: 'age', section: 'patient', title: 'Age', icon: Clock },
  { id: 'bmi', section: 'patient', title: 'BMI Calculator', icon: Activity },
  { id: 'postal', section: 'patient', title: 'Postal Code', icon: MapPin },
  { id: 'diabetes', section: 'patient', title: 'Diabetes', icon: Heart },
  { id: 'asa', section: 'clinical', title: 'ASA Score', icon: Stethoscope },
  { id: 'histology', section: 'clinical', title: 'Histology', icon: Microscope },
  { id: 'tumor', section: 'clinical', title: 'Tumor Location', icon: Navigation },
  { id: 'chemo', section: 'clinical', title: 'Chemotherapy', icon: Hospital },
  { id: 'hospital', section: 'clinical', title: 'Hospital Volume', icon: Hospital }
];
