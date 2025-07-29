const translations = {
  nl: {
    // Header
    title: "Medische Beoordeling Vragenlijst",
    subtitle: "Kanker Patiënt Evaluatie Formulier",
    welcome: "Welkom",
    language: "Taal",
    
    // Welcome screen
    welcomeTitle: "Welkom bij uw Medische Beoordeling",
    welcomeSubtitle: "Bedankt dat u deelneemt aan dit belangrijke onderzoek",
    
    // Information sections
    aboutTitle: "Over deze vragenlijst",
    aboutText: "Deze vragenlijst is ontworpen om belangrijke medische informatie te verzamelen die uw zorgteam helpt bij het maken van geïnformeerde beslissingen over uw behandeling. Uw antwoorden worden gebruikt voor onderzoek en het verbeteren van de zorgkwaliteit voor toekomstige patiënten.",
    
    whatToExpectTitle: "Wat kunt u verwachten",
    whatToExpectItems: [
      "De vragenlijst bestaat uit 10 individuele vragen",
      "Het invullen duurt ongeveer 10-15 minuten",
      "U kunt teruggaan en antwoorden wijzigen",
      "Uw zorgverlener zal de klinische vragen invullen"
    ],
    
    sectionsTitle: "Vragen overzicht",
    section1Title: "1. Patiënt Informatie (5 vragen)",
    section1Text: "Persoonlijke gegevens zoals geslacht, leeftijd, BMI, postcode en diabetes status",
    section2Title: "2. Klinische Gegevens (5 vragen)",
    section2Text: "Medische informatie die door uw zorgverlener wordt ingevuld op basis van uw dossier",
    
    privacyTitle: "Privacy & Vertrouwelijkheid",
    privacyText: "Al uw informatie wordt vertrouwelijk behandeld en gebruikt conform de geldende privacywetgeving. Uw gegevens worden alleen gebruikt voor medische zorg en onderzoek.",
    
    supportTitle: "Hulp nodig?",
    supportText: "Als u vragen heeft tijdens het invullen, aarzel dan niet om uw zorgverlener om hulp te vragen. Elke vraag bevat gedetailleerde uitleg om u te helpen.",
    
    readyTitle: "Klaar om te beginnen?",
    readyText: "Zorg ervoor dat u zich comfortabel voelt en neem de tijd die u nodig heeft. U kunt altijd teruggaan om eerdere antwoorden te wijzigen.",
    
    startButton: "Begin Vragenlijst",
    
    // Navigation
    patientInfo: "Patiënt Informatie",
    clinicalData: "Klinische Gegevens",
    viewOnly: "(Alleen Bekijken)",
    locked: "Vergrendeld",
    unlocked: "Ontgrendeld",
    
    // View modes
    questionView: "Vraag-per-vraag",
    formView: "Formulier Overzicht",
    switchToForm: "Schakel naar Formulier",
    switchToQuestions: "Schakel naar Vragen",
    
    // Clinical blur for patients
    waitingForClinician: "Wachten op zorgverlener om klinische gegevens in te vullen...",
    
    // Patient notification system
    patientSectionComplete: "Patiënt Sectie Voltooid!",
    patientCompleteMessage: "U heeft al uw vragen succesvol beantwoord. U kunt nu uw zorgverlener een melding sturen om de klinische gegevens in te vullen.",
    notifyClinicianButton: "Melding Versturen naar Zorgverlener",
    notificationSentTitle: "Melding Verzonden!",
    notificationSentMessage: "Uw zorgverlener is geïnformeerd dat u uw deel van de vragenlijst heeft voltooid. Zij zullen binnenkort de klinische gegevens invullen.",
    notificationDetails: "Een automatische melding is verzonden naar het zorgteam met de volgende informatie:",
    patientCompleted: "Patiënt heeft alle persoonlijke vragen beantwoord",
    awaitingClinical: "Wachten op invullen van klinische gegevens",
    submissionTime: "Tijdstip van voltooiing",
    
    // Bottom notification
    bottomNotificationTitle: "🎉 Alle vragen beantwoord!",
    bottomNotificationMessage: "U kunt nu uw zorgverlener informeren dat u klaar bent.",
    bottomNotificationButton: "Zorgverlener Informeren",
    bottomNotificationSent: "✅ Zorgverlener geïnformeerd!",
    bottomNotificationSentMessage: "Uw zorgverlener wordt nu op de hoogte gebracht.",
    
    // Question-specific titles
    questionTitles: {
      gender: "Geslacht bij Geboorte",
      age: "Leeftijd",
      bmi: "Body Mass Index",
      postal: "Postcode",
      diabetes: "Diabetes Mellitus",
      asa: "ASA Fysieke Status",
      histology: "Histologische Diagnose",
      tumor: "Tumor Locatie",
      chemo: "Chemotherapie",
      hospital: "Ziekenhuis Volume"
    },
    
    // Patient Information
    patientInfoDesc: "Geef uw persoonlijke informatie voor deze medische beoordeling.",
    birthGender: "Wat is uw geslacht bij geboorte?",
    male: "Man",
    female: "Vrouw", 
    biologicalMale: "Biologische man",
    biologicalFemale: "Biologische vrouw",
    age: "Wat is uw leeftijd?",
    ageHelp: "Klik om te bewerken of gebruik pijlen om aan te passen",
    lockedByClinician: "Vergrendeld door zorgverlener",
    clickToEdit: "Klik om te bewerken",
    bmiCalculator: "Body Mass Index Calculator",
    bmiDesc: "Gebruik de schuifregelaars om uw lengte en gewicht in te voeren. BMI wordt automatisch berekend.",
    bmiLocked: "BMI berekening is vergrendeld door uw zorgverlener.",
    bmiHelp: "BMI wordt gebruikt om te beoordelen of uw gewicht in een gezond bereik is voor uw lengte.",
    postalCode: "Wat is uw postcode?",
    postalFormat: "Formaat: 1234 AB",
    
    // Detailed question information
    genderInfo: "Geslacht bij geboorte verwijst naar het geslacht toegewezen bij geboorte op basis van biologische kenmerken. Deze informatie is belangrijk voor medische risicobeoordeling en behandelingsplanning omdat bepaalde aandoeningen en behandelingsresponsen kunnen verschillen tussen biologische mannen en vrouwen.",
    
    ageInfo: "Uw leeftijd is een cruciale factor in medische besluitvorming. Het beïnvloedt screeningsprotocollen, behandelingsopties, dosering van medicijnen en risicobeoordeling. Verschillende leeftijdsgroepen hebben verschillende gezondheidsrisico's en behandelingsbenaderingen.",
    
    bmiInfo: "Body Mass Index (BMI) is een meting die gebruikt wordt om te beoordelen of uw gewicht gezond is voor uw lengte. Het helpt zorgverleners om potentiële gezondheidsrisico's te identificeren en behandelingsplannen aan te passen. BMI wordt berekend door uw gewicht in kilogram te delen door uw lengte in meters in het kwadraat.",
    
    postalInfo: "Uw postcode helpt ons verschillende factoren te begrijpen die uw gezondheid kunnen beïnvloeden:\\n\\n• Geografische locatie: Belangrijk voor het begrijpen van regionale gezondheidspatronen en milieufactoren\\n• Afstand tot ziekenhuis: Helpt bij het plannen van vervolgafspraken en noodgevallen\\n• Onderzoeksdoeleinden: Gebruikt voor epidemiologische studies en het verbeteren van zorgkwaliteit\\n\\nUw postcode wordt vertrouwelijk behandeld en alleen gebruikt voor medische zorg en onderzoek.",
    
    postalClinicianInfo: "Voor zorgverleners: De postcode wordt geclassificeerd als socio-economische status (SES). Hoge SES (postcodes beginnend met 1-3) zijn meestal stedelijke gebieden met betere toegang tot zorgverlening, hogere inkomens en lagere gezondheidsrisico's. Middel SES (4-6) zijn voorsteden met gemengde demographics. Lage SES (7-9) zijn vaak landelijke gebieden of achterstandswijken met mogelijk beperktere toegang tot gespecialiseerde zorg.",
    
    diabetesInfo: "Diabetes mellitus is een aandoening waarbij uw lichaam problemen heeft met bloedsuikercontrole. Het is belangrijk voor uw zorgteam om te weten of u diabetes heeft omdat:\\n\\n• Behandelingsplanning: Beïnvloedt keuzes voor medicijnen en chirurgie\\n• Complicatierisico: Verhoogt het risico op bepaalde medische complicaties\\n• Monitoring: Vereist extra monitoring tijdens behandeling\\n• Dosering: Kan medicijndoseringen beïnvloeden",
    
    // Diabetes (in patient info)
    diabetes: "Diabetes Mellitus",
    diabetesQuestion: "Heeft u diabetes (diabetes mellitus)?",
    diabetesYes: "Ja - Ik heb diabetes",
    diabetesNo: "Nee - Ik heb geen diabetes",
    
    // Clinical Data 
    clinicalDesc: "De volgende informatie wordt ingevuld door uw zorgverlener. U kunt deze vragen bekijken om te begrijpen welke klinische gegevens worden verzameld als onderdeel van uw beoordeling.",
    clinicalProviderDesc: "De volgende informatie dient te worden ingevuld door de behandelend arts op basis van pathologierapporten, beeldvormingsstudies en klinische dossiers.",
    clinicalViewOnly: "Deze vragen zijn alleen voor bekijken. Uw zorgverlener zal deze informatie invullen op basis van uw medische dossiers en testresultaten.",
    
    // ASA Score (in clinical)
    asaScore: "Fysieke Geschiktheid voor Chirurgie",
    asaClinical: "ASA Fysieke Status Classificatie Systeem (Klinische Beoordeling):",
    asaI: "ASA I - Normale gezonde patiënt",
    asaII: "ASA II - Milde systemische ziekte", 
    asaIII: "ASA III - Ernstige systemische ziekte",
    asaIV: "ASA IV - Ernstige systemische ziekte die een constante bedreiging voor het leven vormt",
    asaV: "ASA V - Moribunde patiënt",
    asaIDesc: "Geen organische, fysiologische of psychiatrische stoornissen",
    asaIIDesc: "Goed gecontroleerde ziekte van één lichaamssysteem",
    asaIIIDesc: "Substantiële functionele beperkingen; een of meer matige tot ernstige ziekten",
    asaIVDesc: "Ten minste één ernstige ziekte die slecht gecontroleerd is of in eindstadium",
    asaVDesc: "Verwacht niet te overleven zonder de operatie",
    
    asaInfo: "De ASA Physical Status Classification helpt chirurgen om uw fysieke conditie te beoordelen voordat u een operatie ondergaat. Het geeft een gestandaardiseerde manier om het anesthesie- en operatierisico in te schatten. Deze classificatie helpt het medische team bij het maken van veilige beslissingen over uw behandeling.",
    
    // Other clinical questions
    histology: "Histologische Diagnose",
    histologyDesc: "Gebaseerd op pathologierapport: Wat is het microscopische celtype van het tumorweefsel?",
    adenocarcinoma: "Adenocarcinoom",
    adenocarcinomaDesc: "Kanker ontstaan uit klierweefsel (meest voorkomende type)",
    squamous: "Plaveiselcelcarcinoom", 
    squamousDesc: "Kanker ontstaan uit platte, schubachtige cellen die organen bekleden",
    
    histologyInfo: "Histologische diagnose wordt bepaald door microscopisch onderzoek van weefselmonsters die tijdens een biopsie zijn genomen. Het celtype van de tumor bepaalt in grote mate hoe de kanker zich gedraagt en welke behandeling het meest effectief is. Deze informatie is essentieel voor het ontwikkelen van uw behandelingsplan.",
    
    tumorLocation: "Anatomische Tumorlocatie",
    tumorLocationDesc: "Gebaseerd op beeldvorming en endoscopische bevindingen: Waar bevindt de primaire tumor zich binnen het orgaan?",
    cervical: "Cervicaal/Proximaal/Bovenste derde",
    cervicalDesc: "Gelegen in het bovenste deel van het orgaan",
    middle: "Middelste derde", 
    middleDesc: "Gelegen in het centrale deel van het orgaan",
    distal: "Distaal/Onderste derde",
    distalDesc: "Gelegen in het onderste deel van het orgaan",
    
    tumorInfo: "De locatie van de tumor binnen het orgaan is cruciaal voor het bepalen van de chirurgische benadering en behandelingsopties. Verschillende locaties kunnen verschillende uitdagingen presenteren voor chirurgen en kunnen verschillende resultaten hebben. Deze informatie helpt bij het plannen van de meest effectieve behandelingsaanpak.",
    
    chemotherapy: "Neoadjuvante/Adjuvante Chemotherapie",
    chemotherapyDesc: "Behandelingsdossiers beoordelen: Heeft de patiënt chemotherapie ontvangen als onderdeel van hun kankerbehandelingsplan?",
    chemotherapyYes: "Ja - Chemotherapie toegediend",
    chemotherapyNo: "Nee - Geen chemotherapie",
    
    chemoInfo: "Chemotherapie kan gegeven worden vóór (neoadjuvant) of na (adjuvant) chirurgie. Deze informatie is belangrijk omdat eerdere chemotherapie kan beïnvloeden:\\n\\n• Chirurgische planning: Beïnvloedt weefselgenezing en operatierisico's\\n• Toekomstige behandeling: Bepaalt welke medicijnen nog gebruikt kunnen worden\\n• Prognose: Helpt bij het voorspellen van behandelingsuitkomsten",
    
    hospitalVolume: "Ziekenhuis Volume Classificatie",
    hospitalVolumeDesc: "Gebaseerd op institutionele gegevens: Wat is de jaarlijkse casusvolume classificatie van deze behandelende faciliteit?",
    lowVolume: "Laag Volume Centrum",
    lowVolumeDesc: "Minder dan 20 gevallen per jaar",
    mediumVolume: "Middel Volume Centrum",
    mediumVolumeDesc: "20-50 gevallen per jaar", 
    highVolume: "Hoog Volume Centrum",
    highVolumeDesc: "Meer dan 50 gevallen per jaar",
    unknown: "Onbekend",
    unknownDesc: "Volume gegevens niet beschikbaar",
    
    hospitalInfo: "Ziekenhuisvolume verwijst naar het aantal vergelijkbare gevallen dat een ziekenhuis per jaar behandelt. Onderzoek toont aan dat ziekenhuizen met een hoger volume vaak betere uitkomsten hebben omdat:\\n\\n• Expertise: Meer ervaring met complexe gevallen\\n• Gespecialiseerde teams: Dedicated oncologie teams\\n• Uitrusting: Gespecialiseerde apparatuur en faciliteiten\\n• Outcomes: Statistisch betere resultaten",
    
    // Actions
    previous: "Vorige",
    next: "Volgende", 
    submit: "Vragenlijst Indienen",
    sendToClinician: "Versturen naar Zorgverlener voor Beoordeling",
    completeAll: "Voltooi alle vragen om vragenlijst in te dienen",
    completed: "voltooid",
    canRequestReview: "U heeft uw sectie voltooid! U kunt nu een zorgverlener beoordeling aanvragen voor de klinische gegevens.",
    
    // Progress
    questionProgress: "Vraag {current} van {total}",
    patientQuestions: "Patiënt Vragen",
    clinicalQuestions: "Klinische Vragen",
    
    // Other
    completedBy: "Voltooid door",
    unselectHint: "Klik nogmaals op de geselecteerde optie om de selectie ongedaan te maken",
    ses: "SES", // Socioeconomic Status
    
    // Collapsible information
    aboutThisQuestion: "Over deze vraag",
    showMoreInfo: "Meer informatie",
    hideInfo: "Minder informatie",
    bmiCategories: {
      underweight: "Ondergewicht",
      healthy: "Gezond gewicht", 
      overweight: "Overgewicht"
    },
    heightLabel: "Lengte",
    weightLabel: "Gewicht",
    bmiResult: "Uw BMI Resultaat",
    bmiCalculation: "Body Mass Index berekening",
    healthGuidance: "Gezondheidsadvies",
    bmiReference: "BMI Categorieën Referentie",
    bmiAdvice: {
      underweight: "Overweeg om gezonde strategieën voor gewichtstoename te bespreken met uw zorgverlener.",
      healthy: "Geweldig! Uw BMI is in het gezonde bereik. Blijf uw huidige levensstijl volhouden.",
      overweight: "Overweeg om gezonde opties voor gewichtsbeheer te bespreken met uw zorgverlener."
    },
    
    // Submit Overview translations
    submitSuccess: "Vragenlijst Succesvol Ingediend!",
    submitSuccessDesc: "Uw medische beoordeling is voltooid en verzonden voor beoordeling.",
    completeOverview: "Volledige Beoordelingsoverzicht",
    reviewSubmitted: "Bekijk alle ingediende informatie hieronder",
    patientInfoSection: "Patiënt Informatie",
    healthAssessment: "Gezondheidsbeoordeling",
    clinicalAssessment: "Klinische Beoordeling",
    completionSummary: "Beoordelingsvoltooiing Samenvatting",
    completedSection: "voltooide sectie",
    backToQuestionnaire: "Terug naar Vragenlijst",
    editResponses: "Bewerk Antwoorden",
    confirmSubmission: "Bevestig Indiening",
    submissionAlert: "Beoordelingsgegevens zijn succesvol ingediend bij uw zorgteam!",
    
    // Form field labels
    birthGenderLabel: "Geslacht bij Geboorte",
    ageLabel: "Leeftijd",
    postalCodeLabel: "Postcode",
    heightWeightLabel: "Lengte & Gewicht",
    bmiLabel: "BMI",
    diabetesLabel: "Diabetes Mellitus",
    asaLabel: "ASA Fysieke Status",
    histologyLabel: "Histologische Diagnose",
    tumorLocationLabel: "Tumor Locatie",
    chemotherapyLabel: "Chemotherapie",
    hospitalVolumeLabel: "Ziekenhuis Volume",
    yearsOld: "jaar oud",
    
    // Final confirmation screen
    submissionComplete: "Indiening Voltooid!",
    submissionCompleteDesc: "Uw medische beoordeling is succesvol verwerkt en opgeslagen in het systeem.",
    submissionThankYou: "Bedankt voor uw medewerking",
    submissionNext: "Uw zorgteam heeft toegang tot uw antwoorden en zal contact met u opnemen voor verdere stappen in uw behandelingsplan.",
    submissionReference: "Referentienummer",
    submissionDateTime: "Datum & Tijd van Indiening",
    newQuestionnaire: "Nieuwe Vragenlijst",
    returnToDashboard: "Terug naar Dashboard",
    
    // Value formatting Dutch
    valueFormat: {
      male: "Man",
      female: "Vrouw",
      yes: "Ja",
      no: "Nee",
      asaI: "ASA I - Normale gezonde patiënt",
      asaII: "ASA II - Milde systemische ziekte",
      asaIII: "ASA III - Ernstige systemische ziekte",
      asaIV: "ASA IV - Ernstige systemische ziekte (levensbedreiging)",
      asaV: "ASA V - Moribunde patiënt",
      adenocarcinoma: "Adenocarcinoom",
      squamous: "Plaveiselcelcarcinoom",
      cervical: "Cervicaal/Proximaal/Bovenste derde",
      middle: "Middelste derde",
      distal: "Distaal/Onderste derde",
      lowVolume: "Laag Volume Centrum (minder dan 20 gevallen per jaar)",
      mediumVolume: "Middel Volume Centrum (20-50 gevallen per jaar)",
      highVolume: "Hoog Volume Centrum (meer dan 50 gevallen per jaar)",
      unknown: "Onbekend"
    }
  },
  en: {
    // Header
    title: "Medical Assessment Questionnaire",
    subtitle: "Cancer Patient Evaluation Form", 
    welcome: "Welcome",
    language: "Language",
    
    // Welcome screen
    welcomeTitle: "Welcome to Your Medical Assessment",
    welcomeSubtitle: "Thank you for participating in this important evaluation",
    
    // Information sections
    aboutTitle: "About this questionnaire",
    aboutText: "This questionnaire is designed to collect important medical information that will help your care team make informed decisions about your treatment. Your responses will be used for research and improving care quality for future patients.",
    
    whatToExpectTitle: "What to expect",
    whatToExpectItems: [
      "The questionnaire consists of 10 individual questions",
      "It takes approximately 10-15 minutes to complete",
      "You can go back and modify your answers",
      "Your healthcare provider will complete the clinical questions"
    ],
    
    sectionsTitle: "Questions overview",
    section1Title: "1. Patient Information (5 questions)",
    section1Text: "Personal details such as gender, age, BMI, postal code, and diabetes status",
    section2Title: "2. Clinical Data (5 questions)",
    section2Text: "Medical information completed by your healthcare provider based on your records",
    
    privacyTitle: "Privacy & Confidentiality",
    privacyText: "All your information is treated confidentially and used in accordance with applicable privacy legislation. Your data is only used for medical care and research purposes.",
    
    supportTitle: "Need help?",
    supportText: "If you have questions while completing the form, don't hesitate to ask your healthcare provider for assistance. Each question contains detailed explanations to help you.",
    
    readyTitle: "Ready to begin?",
    readyText: "Make sure you feel comfortable and take the time you need. You can always go back to change previous answers.",
    
    startButton: "Start Questionnaire",
    
    // Navigation
    patientInfo: "Patient Information",
    clinicalData: "Clinical Data", 
    viewOnly: "(View Only)",
    locked: "Locked",
    unlocked: "Unlocked",
    
    // View modes
    questionView: "Question-by-Question",
    formView: "Form Overview",
    switchToForm: "Switch to Form",
    switchToQuestions: "Switch to Questions",
    
    // Clinical blur for patients
    waitingForClinician: "Waiting for clinician to complete clinical data...",
    
    // Patient notification system
    patientSectionComplete: "Patient Section Complete!",
    patientCompleteMessage: "You have successfully answered all your questions. You can now notify your healthcare provider to complete the clinical data.",
    notifyClinicianButton: "Notify Healthcare Provider",
    notificationSentTitle: "Notification Sent!",
    notificationSentMessage: "Your healthcare provider has been notified that you have completed your part of the questionnaire. They will complete the clinical data shortly.",
    notificationDetails: "An automated notification has been sent to your healthcare team with the following information:",
    patientCompleted: "Patient has answered all personal questions",
    awaitingClinical: "Awaiting completion of clinical data",
    submissionTime: "Time of completion",
    
    // Bottom notification
    bottomNotificationTitle: "🎉 All questions answered!",
    bottomNotificationMessage: "You can now inform your healthcare provider that you're ready.",
    bottomNotificationButton: "Inform Healthcare Provider",
    bottomNotificationSent: "✅ Healthcare provider informed!",
    bottomNotificationSentMessage: "Your healthcare provider is now being notified.",
    
    // Question-specific titles
    questionTitles: {
      gender: "Birth Gender",
      age: "Age",
      bmi: "Body Mass Index",
      postal: "Postal Code",
      diabetes: "Diabetes Mellitus",
      asa: "ASA Physical Status",
      histology: "Histological Diagnosis",
      tumor: "Tumor Location",
      chemo: "Chemotherapy",
      hospital: "Hospital Volume"
    },
    
    // Patient Information
    patientInfoDesc: "Please provide your personal information for this medical assessment.",
    birthGender: "What is your birth gender?",
    male: "Male",
    female: "Female",
    biologicalMale: "Biological male", 
    biologicalFemale: "Biological female",
    age: "What is your age?",
    ageHelp: "Click to edit or use arrows to adjust",
    lockedByClinician: "Locked by clinician",
    clickToEdit: "Click to edit",
    bmiCalculator: "Body Mass Index Calculator",
    bmiDesc: "Use the sliders to input your height and weight. BMI will be calculated automatically.",
    bmiLocked: "BMI calculation is locked by your clinician.",
    bmiHelp: "BMI is used to assess whether your weight is in a healthy range for your height.",
    postalCode: "What is your postal code?",
    postalFormat: "Format: 1234 AB",
    
    // Detailed question information
    genderInfo: "Birth gender refers to the gender assigned at birth based on biological characteristics. This information is important for medical risk assessment and treatment planning as certain conditions and treatment responses may differ between biological males and females.",
    
    ageInfo: "Your age is a crucial factor in medical decision-making. It influences screening protocols, treatment options, medication dosing, and risk assessment. Different age groups have different health risks and treatment approaches.",
    
    bmiInfo: "Body Mass Index (BMI) is a measurement used to assess whether your weight is healthy for your height. It helps healthcare providers identify potential health risks and adjust treatment plans accordingly. BMI is calculated by dividing your weight in kilograms by your height in meters squared.",
    
    postalInfo: "Your postal code helps us understand various factors that may affect your health:\\n\\n• Geographic location: Important for understanding regional health patterns and environmental factors\\n• Distance to hospital: Helps with planning follow-up appointments and emergencies\\n• Research purposes: Used for epidemiological studies and improving quality of care\\n\\nYour postal code is treated confidentially and only used for medical care and research.",
    
    postalClinicianInfo: "For healthcare providers: The postal code is classified as socio-economic status (SES). High SES (postal codes starting with 1-3) are typically urban areas with better healthcare access, higher incomes, and lower health risks. Medium SES (4-6) are suburban areas with mixed demographics. Low SES (7-9) are often rural areas or disadvantaged neighborhoods with potentially limited access to specialized care.",
    
    diabetesInfo: "Diabetes mellitus is a condition where your body has problems with blood sugar control. It's important for your care team to know if you have diabetes because:\\n\\n• Treatment planning: Affects choices for medications and surgery\\n• Complication risk: Increases risk of certain medical complications\\n• Monitoring: Requires additional monitoring during treatment\\n• Dosing: Can affect medication dosages",
    
    // Diabetes (in patient info)
    diabetes: "Diabetes Mellitus",
    diabetesQuestion: "Do you have diabetes (diabetes mellitus)?",
    diabetesYes: "Yes - I have diabetes",
    diabetesNo: "No - I do not have diabetes",
    
    // Clinical Data
    clinicalDesc: "The following information will be completed by your healthcare provider. You can view these questions to understand what clinical data is being collected as part of your assessment.",
    clinicalProviderDesc: "The following information should be completed by the treating physician based on pathology reports, imaging studies, and clinical records.",
    clinicalViewOnly: "These questions are for viewing only. Your healthcare provider will complete this information based on your medical records and test results.",
    
    // ASA Score (in clinical)
    asaScore: "Physical Fitness for Surgery",
    asaClinical: "ASA Physical Status Classification System (Clinical Assessment):",
    asaI: "ASA I - Normal healthy patient",
    asaII: "ASA II - Mild systemic disease",
    asaIII: "ASA III - Severe systemic disease", 
    asaIV: "ASA IV - Severe systemic disease that is a constant threat to life",
    asaV: "ASA V - Moribund patient",
    asaIDesc: "No organic, physiologic, or psychiatric disturbance",
    asaIIDesc: "Well-controlled disease of one body system",
    asaIIIDesc: "Substantive functional limitations; one or more moderate to severe diseases",
    asaIVDesc: "At least one severe disease that is poorly controlled or at end-stage", 
    asaVDesc: "Not expected to survive without the operation",
    
    asaInfo: "The ASA Physical Status Classification helps surgeons assess your physical condition before you undergo surgery. It provides a standardized way to estimate anesthesia and surgical risk. This classification helps the medical team make safe decisions about your treatment.",
    
    // Other clinical questions
    histology: "Histological Diagnosis",
    histologyDesc: "Based on pathology report: What is the microscopic cellular type of the tumour tissue?",
    adenocarcinoma: "Adenocarcinoma",
    adenocarcinomaDesc: "Cancer arising from glandular tissue (most common type)",
    squamous: "Squamous cell carcinoma",
    squamousDesc: "Cancer arising from flat, scale-like cells lining organs",
    
    histologyInfo: "Histological diagnosis is determined by microscopic examination of tissue samples taken during biopsy. The cell type of the tumor largely determines how the cancer behaves and which treatment will be most effective. This information is essential for developing your treatment plan.",
    
    tumorLocation: "Anatomical Tumor Location",
    tumorLocationDesc: "Based on imaging and endoscopic findings: Where is the primary tumor located within the organ?",
    cervical: "Cervical/Proximal/Upper third",
    cervicalDesc: "Located in the upper portion of the organ",
    middle: "Middle third",
    middleDesc: "Located in the central portion of the organ",
    distal: "Distal/Lower third", 
    distalDesc: "Located in the lower portion of the organ",
    
    tumorInfo: "The location of the tumor within the organ is crucial for determining the surgical approach and treatment options. Different locations may present different challenges for surgeons and may have different outcomes. This information helps plan the most effective treatment approach.",
    
    chemotherapy: "Neoadjuvant/Adjuvant Chemotherapy",
    chemotherapyDesc: "Review treatment records: Has the patient received chemotherapy as part of their cancer treatment plan?",
    chemotherapyYes: "Yes - Chemotherapy administered",
    chemotherapyNo: "No - No chemotherapy",
    
    chemoInfo: "Chemotherapy can be given before (neoadjuvant) or after (adjuvant) surgery. This information is important because previous chemotherapy can affect:\\n\\n• Surgical planning: Affects tissue healing and surgical risks\\n• Future treatment: Determines which medications can still be used\\n• Prognosis: Helps predict treatment outcomes",
    
    hospitalVolume: "Hospital Volume Classification",
    hospitalVolumeDesc: "Based on institutional data: What is the annual case volume classification of this treating facility?",
    lowVolume: "Low Volume Center",
    lowVolumeDesc: "Less than 20 cases per year",
    mediumVolume: "Medium Volume Center", 
    mediumVolumeDesc: "20-50 cases per year",
    highVolume: "High Volume Center", 
    highVolumeDesc: "More than 50 cases per year",
    unknown: "Unknown",
    unknownDesc: "Volume data not available",
    
    hospitalInfo: "Hospital volume refers to the number of similar cases a hospital treats per year. Research shows that hospitals with higher volumes often have better outcomes because:\\n\\n• Expertise: More experience with complex cases\\n• Specialized teams: Dedicated oncology teams\\n• Equipment: Specialized equipment and facilities\\n• Outcomes: Statistically better results",
    
    // Actions
    previous: "Previous",
    next: "Next",
    submit: "Submit Questionnaire", 
    sendToClinician: "Send to Clinician for Review",
    completeAll: "Complete all questions to submit questionnaire",
    completed: "completed",
    canRequestReview: "You've completed your section! You can now request clinician review for the clinical data.",
    
    // Progress
    questionProgress: "Question {current} of {total}",
    patientQuestions: "Patient Questions",
    clinicalQuestions: "Clinical Questions",
    
    // Other
    completedBy: "Completed by",
    unselectHint: "Click the selected option again to unselect it",
    ses: "SES", // Socioeconomic Status
    
    // Collapsible information
    aboutThisQuestion: "About this question",
    showMoreInfo: "More information",
    hideInfo: "Less information",
    bmiCategories: {
      underweight: "Underweight",
      healthy: "Healthy weight",
      overweight: "Overweight"
    },
    heightLabel: "Height",
    weightLabel: "Weight", 
    bmiResult: "Your BMI Result",
    bmiCalculation: "Body Mass Index calculation",
    healthGuidance: "Health Guidance",
    bmiReference: "BMI Categories Reference",
    bmiAdvice: {
      underweight: "Consider discussing healthy weight gain strategies with your healthcare provider.",
      healthy: "Great! Your BMI is in the healthy range. Continue maintaining your current lifestyle.",
      overweight: "Consider discussing healthy weight management options with your healthcare provider."
    },
    
    // Submit Overview translations
    submitSuccess: "Questionnaire Successfully Submitted!",
    submitSuccessDesc: "Your medical assessment has been completed and sent for review.",
    completeOverview: "Complete Assessment Overview",
    reviewSubmitted: "Review all submitted information below",
    patientInfoSection: "Patient Information",
    healthAssessment: "Health Assessment",
    clinicalAssessment: "Clinical Assessment",
    completionSummary: "Assessment Completion Summary",
    completedSection: "completed section",
    backToQuestionnaire: "Back to Questionnaire",
    editResponses: "Edit Responses",
    confirmSubmission: "Confirm Submission",
    submissionAlert: "Assessment data has been successfully submitted to your healthcare team!",
    
    // Form field labels
    birthGenderLabel: "Birth Gender",
    ageLabel: "Age",
    postalCodeLabel: "Postal Code",
    heightWeightLabel: "Height & Weight",
    bmiLabel: "BMI",
    diabetesLabel: "Diabetes Mellitus",
    asaLabel: "ASA Physical Status",
    histologyLabel: "Histological Diagnosis",
    tumorLocationLabel: "Tumor Location",
    chemotherapyLabel: "Chemotherapy",
    hospitalVolumeLabel: "Hospital Volume",
    yearsOld: "years old",
    
    // Final confirmation screen
    submissionComplete: "Submission Complete!",
    submissionCompleteDesc: "Your medical assessment has been successfully processed and stored in the system.",
    submissionThankYou: "Thank you for your participation",
    submissionNext: "Your healthcare team now has access to your responses and will contact you for the next steps in your treatment plan.",
    submissionReference: "Reference Number",
    submissionDateTime: "Submission Date & Time",
    newQuestionnaire: "New Questionnaire",
    returnToDashboard: "Return to Dashboard",
    
    // Value formatting English
    valueFormat: {
      male: "Male",
      female: "Female",
      yes: "Yes",
      no: "No",
      asaI: "ASA I - Normal healthy patient",
      asaII: "ASA II - Mild systemic disease",
      asaIII: "ASA III - Severe systemic disease",
      asaIV: "ASA IV - Severe systemic disease (life threatening)",
      asaV: "ASA V - Moribund patient",
      adenocarcinoma: "Adenocarcinoma",
      squamous: "Squamous cell carcinoma",
      cervical: "Cervical/Proximal/Upper third",
      middle: "Middle third",
      distal: "Distal/Lower third",
      lowVolume: "Low Volume Center (less than 20 cases per year)",
      mediumVolume: "Medium Volume Center (20-50 cases per year)",
      highVolume: "High Volume Center (more than 50 cases per year)",
      unknown: "Unknown"
    }
  }
};

export default translations;