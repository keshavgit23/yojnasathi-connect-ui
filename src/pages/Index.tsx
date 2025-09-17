import { useState } from "react";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import SchemeCard from "@/components/SchemeCard";
import MySchemes from "@/components/MySchemes";
import MyAppointments from "@/components/MyAppointments";
import MyProfile from "@/components/MyProfile";
import SchemeDetail from "@/components/SchemeDetail";
import ApplyForm from "@/components/ApplyForm";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  beneficiaries: string;
  amount: string;
  deadline: string;
  status: "Live" | "Over";
  eligibility: string;
  schemeKey?: string;
}

interface Appointment {
  id: string;
  schemeName: string;
  schemeKey?: string;
  centerName: string;
  date: string;
  time: string;
  status: string;
  appointmentType: string;
  charges: string;
}

const Index = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("schemes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const defaultSchemes: Scheme[] = [
    {
      id: "1",
      title: "Mazhi Ladki Bahin Yojana",
      description: "Financial assistance scheme for women empowerment and support in Maharashtra",
      category: "Women Welfare",
      beneficiaries: "Women aged 21-65",
      amount: "₹1,500 per month",
      deadline: "Dec 31, 2024",
      status: "Live",
      eligibility: "Women residents of Maharashtra aged between 21-65 years with annual family income less than ₹2.5 lakh",
      schemeKey: "scheme.mazhiLadkiBahin"
    },
    {
      id: "2",
      title: "PM Kisan Yojana",
      description: "Direct income support to farmers for agriculture and allied activities",
      category: "Agriculture",
      beneficiaries: "Small & marginal farmers",
      amount: "₹6,000 per year",
      deadline: "Ongoing",
      status: "Live",
      eligibility: "Small and marginal farmers with cultivable land up to 2 hectares",
      schemeKey: "scheme.pmKisan"
    },
    {
      id: "3",
      title: "Majur Kamgar Bhandkam Yojana",
      description: "Social security and welfare scheme for construction workers and laborers",
      category: "Labor Welfare",
      beneficiaries: "Construction workers",
      amount: "Various benefits",
      deadline: "Mar 31, 2025",
      status: "Live",
      eligibility: "Registered construction workers with active membership in labor board",
      schemeKey: "scheme.majurKamgar"
    },
    {
      id: "4",
      title: "Pradhan Mantri Awas Yojana",
      description: "Housing for All mission providing affordable housing to eligible families",
      category: "Housing",
      beneficiaries: "EWS, LIG, MIG families",
      amount: "Up to ₹2.67 lakh subsidy",
      deadline: "Dec 31, 2024",
      status: "Over",
      eligibility: "Families without pucca house, annual income criteria based on category",
      schemeKey: "scheme.pmAwas"
    }
  ];

  // Filter schemes based on search query
  const filteredSchemes = defaultSchemes.filter(scheme =>
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSchemeClick = (scheme: Scheme) => {
    setSelectedScheme(scheme);
  };

  const handleBackToSchemes = () => {
    setSelectedScheme(null);
    setShowApplyForm(false);
    setAppointmentDetails(null);
  };

  const handleApplyClick = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setShowApplyForm(true);
  };

  const handleBackToSchemeDetail = () => {
    setShowApplyForm(false);
  };

  const handleConfirmAppointment = (details: any) => {
    // Create new appointment
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      schemeName: details.schemeName,
      schemeKey: selectedScheme?.schemeKey,
      centerName: details.cscName,
      date: details.date,
      time: details.time,
      status: "Confirmed",
      appointmentType: details.appointmentType,
      charges: details.charge
    };
    
    // Add to appointments list
    setAppointments(prev => [...prev, newAppointment]);
    
    setAppointmentDetails(details);
    setShowApplyForm(false);
  };

  const handleGoHome = () => {
    setActiveTab("appointments");
    setSelectedScheme(null);
    setShowApplyForm(false);
    setAppointmentDetails(null);
  };

  const renderContent = () => {
    if (appointmentDetails) {
      return (
        <ConfirmationScreen
          appointmentDetails={appointmentDetails}
          onGoHome={handleGoHome}
        />
      );
    }

    if (showApplyForm && selectedScheme) {
      return (
        <ApplyForm
          schemeName={selectedScheme.title}
          onBack={handleBackToSchemeDetail}
          onConfirm={handleConfirmAppointment}
        />
      );
    }

    if (selectedScheme) {
      return (
        <SchemeDetail 
          scheme={selectedScheme} 
          onBack={handleBackToSchemes}
          onApply={handleApplyClick}
        />
      );
    }

    switch (activeTab) {
      case "schemes":
        return <MySchemes onSchemeClick={handleSchemeClick} />;
      case "appointments":
        return <MyAppointments appointments={appointments} />;
      case "profile":
        return <MyProfile />;
      default:
        return (
          <>
            {/* Hero Section with Search */}
            <section className="py-12 text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {t('home.welcome')} <span className="text-primary">{t('nav.brandName')}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('home.subtitle')}
              </p>
              
              {/* Search Bar */}
              <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </section>
            
            {/* Default Schemes Section */}
            <section className="py-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">{t('home.popularSchemes')}</h2>
                <button className="text-primary hover:text-primary/80 font-medium">
                  {t('home.viewAll')}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    title={scheme.schemeKey ? t(scheme.schemeKey) : scheme.title}
                    description={scheme.description}
                    category={scheme.category}
                    beneficiaries={scheme.beneficiaries}
                    amount={scheme.amount}
                    deadline={scheme.deadline}
                    onClick={() => handleSchemeClick(scheme)}
                  />
                ))}
              </div>
            </section>
            
            {/* Quick Actions */}
            <section className="py-8 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t('home.searchSchemes')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('home.searchDescription')}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t('home.applyOnline')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('home.applyDescription')}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t('home.trackProgress')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('home.trackDescription')}
                  </p>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Search Bar - only show on homepage */}
      {!selectedScheme && activeTab === "schemes" && (
        <div className="bg-background border-b border-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
