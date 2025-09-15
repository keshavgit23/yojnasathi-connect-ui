import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'mr' | 'hi' | 'gu' | 'ta';

interface Translations {
  [key: string]: {
    [language in Language]: string;
  };
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Navigation
  'nav.mySchemes': {
    en: 'My Schemes',
    mr: 'माझ्या योजना',
    hi: 'मेरी योजनाएं',
    gu: 'મારી યોજનાઓ',
    ta: 'எனது திட்டங்கள்'
  },
  'nav.myAppointments': {
    en: 'My Appointments',
    mr: 'माझ्या भेटी',
    hi: 'मेरी अपॉइंटमेंट',
    gu: 'મારી મુલાકાતો',
    ta: 'எனது சந்திப்புகள்'
  },
  'nav.myProfile': {
    en: 'My Profile',
    mr: 'माझे प्रोफाइल',
    hi: 'मेरी प्रोफ़ाइल',
    gu: 'મારી પ્રોફાઇલ',
    ta: 'எனது சுயவிவரம்'
  },
  'nav.brandName': {
    en: 'YojnaSathi',
    mr: 'योजनासाथी',
    hi: 'योजनासाथी',
    gu: 'યોજનાસાથી',
    ta: 'யோஜனாசாதி'
  },
  
  // Common
  'common.apply': {
    en: 'Apply',
    mr: 'अर्ज करा',
    hi: 'आवेदन करें',
    gu: 'અરજી કરો',
    ta: 'விண்ணப்பிக்கவும்'
  },
  'common.back': {
    en: 'Back',
    mr: 'मागे',
    hi: 'वापस',
    gu: 'પાછળ',
    ta: 'திரும்ப'
  },
  'common.confirm': {
    en: 'Confirm',
    mr: 'पुष्टी करा',
    hi: 'पुष्टि करें',
    gu: 'પુષ્ટિ કરો',
    ta: 'உறுதிப்படுத்தவும்'
  },
  'common.search': {
    en: 'Search schemes...',
    mr: 'योजना शोधा...',
    hi: 'योजनाएं खोजें...',
    gu: 'યોજનાઓ શોધો...',
    ta: 'திட்டங்களை தேடுங்கள்...'
  },
  'common.date': {
    en: 'Date',
    mr: 'तारीख',
    hi: 'तारीख',
    gu: 'તારીખ',
    ta: 'தேதி'
  },
  'common.time': {
    en: 'Time',
    mr: 'वेळ',
    hi: 'समय',
    gu: 'સમય',
    ta: 'நேரம்'
  },
  'common.status': {
    en: 'Status',
    mr: 'स्थिती',
    hi: 'स्थिति',
    gu: 'સ્થિતિ',
    ta: 'நிலை'
  },
  'common.confirmed': {
    en: 'Confirmed',
    mr: 'पुष्ट',
    hi: 'पुष्ट',
    gu: 'પુષ્ટિ થયેલ',
    ta: 'உறுதிப்படுத்தப்பட்டது'
  },
  'common.pending': {
    en: 'Pending',
    mr: 'प्रलंबित',
    hi: 'लंबित',
    gu: 'બાકી',
    ta: 'நிலுவையில்'
  },
  'common.normal': {
    en: 'Normal',
    mr: 'सामान्य',
    hi: 'सामान्य',
    gu: 'સામાન્ય',
    ta: 'சாதாரண'
  },
  'common.urgent': {
    en: 'Urgent',
    mr: 'तातडीचे',
    hi: 'तत्काल',
    gu: 'તાત્કાલિક',
    ta: 'அவசர'
  },

  // Appointments
  'appointments.title': {
    en: 'My Appointments',
    mr: 'माझ्या भेटी',
    hi: 'मेरी अपॉइंटमेंट',
    gu: 'મારી મુલાકાતો',
    ta: 'எனது சந்திப்புகள்'
  },
  'appointments.scheme': {
    en: 'Scheme',
    mr: 'योजना',
    hi: 'योजना',
    gu: 'યોજના',
    ta: 'திட்டம்'
  },
  'appointments.type': {
    en: 'Type',
    mr: 'प्रकार',
    hi: 'प्रकार',
    gu: 'પ્રકાર',
    ta: 'வகை'
  },
  'appointments.center': {
    en: 'Center',
    mr: 'केंद्र',
    hi: 'केंद्र',
    gu: 'કેન્દ્ર',
    ta: 'மையம்'
  },
  'appointments.charges': {
    en: 'Charges',
    mr: 'शुल्क',
    hi: 'शुल्क',
    gu: 'ચાર્જ',
    ta: 'கட்டணம்'
  },
  'appointments.noAppointments': {
    en: 'No appointments scheduled yet.',
    mr: 'अद्याप कोणत्याही भेटी निश्चित केल्या नाहीत.',
    hi: 'अभी तक कोई अपॉइंटमेंट शेड्यूल नहीं है।',
    gu: 'હજી સુધી કોઈ મુલાકાત સુનિશ્ચિત નથી.',
    ta: 'இன்னும் எந்த சந்திப்பும் நிர்ધாரிக்கப்படவில்லை.'
  },

  // Scheme names
  'scheme.mazhiLadkiBahin': {
    en: 'Mazhi Ladki Bahin Yojana',
    mr: 'माझी लाडकी बहीण योजना',
    hi: 'मझी लाडकी बहिन योजना',
    gu: 'માઝી લાડકી બહેન યોજના',
    ta: 'மஜி லாட்கி பஹின் யோஜனா'
  },
  'scheme.pmKisan': {
    en: 'PM Kisan Yojana',
    mr: 'पीएम किसान योजना',
    hi: 'पीएम किसान योजना',
    gu: 'પીએમ કિસાન યોજના',
    ta: 'பிஎம் கிசான் யோஜனா'
  },
  'scheme.majurKamgar': {
    en: 'Majur Kamgar Bhandkam Yojana',
    mr: 'मजूर कामगार भांडकम योजना',
    hi: 'मजदूर कामगार भंडकम योजना',
    gu: 'મજૂર કામગાર ભંડકમ યોજના',
    ta: 'மஜூர் காம்கார் பாண்டகம் யோஜனா'
  },
  'scheme.pmAwas': {
    en: 'Pradhan Mantri Awas Yojana',
    mr: 'प्रधानमंत्री आवास योजना',
    hi: 'प्रधानमंत्री आवास योजना',
    gu: 'પ્રધાનમંત્રી આવાસ યોજના',
    ta: 'பிரதான மந்திரி ஆவாஸ் யோஜனா'
  },

  // Apply form
  'apply.title': {
    en: 'Apply for',
    mr: 'अर्ज करा',
    hi: 'आवेदन करें',
    gu: 'અરજી કરો',
    ta: 'விண்ணப்பிக்கவும்'
  },
  'apply.selectLocation': {
    en: 'Select your location to find nearby eSeva/CSC centers',
    mr: 'जवळच्या eSeva/CSC केंद्रे शोधण्यासाठी तुमचे स्थान निवडा',
    hi: 'पास के eSeva/CSC केंद्र खोजने के लिए अपना स्थान चुनें',
    gu: 'નજીકના eSeva/CSC કેન્દ્રો શોધવા માટે તમારું સ્થાન પસંદ કરો',
    ta: 'அருகிலுள்ள eSeva/CSC மையங்களைக் கண்டறிய உங்கள் இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்'
  },

  // Location Selection
  'location.selectState': {
    en: 'Select State',
    mr: 'राज्य निवडा',
    hi: 'राज्य चुनें',
    gu: 'રાજ્ય પસંદ કરો',
    ta: 'மாநிலம் தேர்ந்தெடுக்கவும்'
  },
  'location.selectDistrict': {
    en: 'Select District',
    mr: 'जिल्हा निवडा',
    hi: 'जिला चुनें',
    gu: 'જિલ્લો પસંદ કરો',
    ta: 'மாவட்டம் தேர்ந்தெடுக்கவும்'
  },
  'location.selectTaluka': {
    en: 'Select Taluka',
    mr: 'तालुका निवडा',
    hi: 'तालुका चुनें',
    gu: 'તાલુકો પસંદ કરો',
    ta: 'தாலுகா தேர்ந்தெடுக்கவும்'
  },
  'location.state': {
    en: 'State',
    mr: 'राज्य',
    hi: 'राज्य',
    gu: 'રાજ્ય',
    ta: 'மாநிலம்'
  },
  'location.district': {
    en: 'District',
    mr: 'जिल्हा',
    hi: 'जिला',
    gu: 'જિલ્લો',
    ta: 'மாவட்டம்'
  },
  'location.taluka': {
    en: 'Taluka',
    mr: 'तालुका',
    hi: 'तालुका',
    gu: 'તાલુકો',
    ta: 'தாலுகா'
  },
  'location.selectYourLocation': {
    en: 'Select Your Location',
    mr: 'तुमचे स्थान निवडा',
    hi: 'अपना स्थान चुनें',
    gu: 'તમારું સ્થાન પસંદ કરો',
    ta: 'உங்கள் இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்'
  },

  // Date Time Selection
  'dateTime.chooseDateTime': {
    en: 'Choose Appointment Date & Time',
    mr: 'भेटीची तारीख आणि वेळ निवडा',
    hi: 'अपॉइंटमेंट की तारीख और समय चुनें',
    gu: 'એપોઇન્ટમેન્ટની તારીખ અને સમય પસંદ કરો',
    ta: 'சந்திப்பு தேதி மற்றும் நேரத்தைத் தேர்ந்தெடுக்கவும்'
  },
  'dateTime.selectDate': {
    en: 'Select Date',
    mr: 'तारीख निवडा',
    hi: 'तारीख चुनें',
    gu: 'તારીખ પસંદ કરો',
    ta: 'தேதியைத் தேர்ந்தெடுக்கவும்'
  },
  'dateTime.pickDate': {
    en: 'Pick a date',
    mr: 'तारीख निवडा',
    hi: 'तारीख चुनें',
    gu: 'તારીખ પસંદ કરો',
    ta: 'தேதியைத் தேர்ந்தெடுக்கவும்'
  },
  'dateTime.selectTimeSlot': {
    en: 'Select Time Slot',
    mr: 'वेळ स्लॉट निवडा',
    hi: 'समय स्लॉट चुनें',
    gu: 'ટાઇમ સ્લોટ પસંદ કરો',
    ta: 'நேர இடைவெளியைத் தேர்ந்தெடুக்கவும்'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};