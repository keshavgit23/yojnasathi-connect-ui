import { useState } from "react";
import SchemeCard from "./SchemeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
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
  howToApply?: string[];
}

interface MySchemesProps {
  onSchemeClick: (scheme: Scheme) => void;
}

const MySchemes = ({ onSchemeClick }: MySchemesProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("सर्व");

  const filterOptions = ["सर्व", "शेतकरी योजना", "महिला योजना", "विद्यार्थी योजना", "घरकुल योजना"];
  
  const schemes: Scheme[] = [
    {
      id: "1",
      title: "माझी लाडकी बहीण योजना (Mazhi Ladki Bahin Yojana)",
      description: "महिला सशक्तिकरण आणि सहाय्य योजना - Financial assistance scheme for women empowerment",
      category: "महिला योजना",
      beneficiaries: "21-65 वयोगटातील महिला",
      amount: "₹1,500 प्रति महिना",
      deadline: "31 डिसेंबर, 2024",
      status: "Live",
      eligibility: "महाराष्ट्रातील 21-65 वयोगटातील महिला ज्यांचे कौटुंबिक वार्षिक उत्पन्न ₹2.5 लाखांपेक्षा कमी आहे",
      howToApply: ["आधार कार्ड तयार ठेवा", "उत्पन्न प्रमाणपत्र", "बँक खाते तपशील", "ऑनलाइन अर्ज भरा"]
    },
    {
      id: "2",
      title: "पंतप्रधान किसान योजना (PM Kisan Yojana)",
      description: "शेतकऱ्यांना थेट आर्थिक सहाय्य - Direct income support to farmers",
      category: "शेतकरी योजना",
      beneficiaries: "लहान व सीमांत शेतकरी",
      amount: "₹6,000 प्रति वर्ष",
      deadline: "सतत चालू",
      status: "Live",
      eligibility: "2 हेक्टरपर्यंत शेती जमीन असलेले लहान व सीमांत शेतकरी",
      howToApply: ["जमीन कागदपत्रे", "आधार कार्ड", "बँक खाते तपशील", "PM-KISAN पोर्टलवर नोंदणी"]
    },
    {
      id: "3",
      title: "मजूर कामगार भांडकम योजना (Majur Kamgar Bhandkam Yojana)",
      description: "बांधकाम कामगारांसाठी सामाजिक सुरक्षा योजना - Social security for construction workers",
      category: "कामगार योजना",
      beneficiaries: "बांधकाम कामगार",
      amount: "विविध फायदे",
      deadline: "31 मार्च, 2025",
      status: "Live",
      eligibility: "कामगार मंडळात नोंदणी केलेले बांधकाम कामगार",
      howToApply: ["कामगार मंडळ नोंदणी", "काम प्रमाणपत्र", "आधार कार्ड", "ऑनलाइन अर्ज"]
    },
    {
      id: "4",
      title: "पंतप्रधान आवास योजना (Pradhan Mantri Awas Yojana)",
      description: "सर्वांसाठी घर मिशन - परवडणारी घरे - Housing for All mission",
      category: "घरकुल योजना",
      beneficiaries: "EWS, LIG, MIG कुटुंबे",
      amount: "₹2.67 लाख पर्यंत अनुदान",
      deadline: "31 डिसेंबर, 2024",
      status: "Over",
      eligibility: "ज्यांच्याकडे पक्के घर नाही अशी कुटुंबे, उत्पन्नाचे निकष",
      howToApply: ["उत्पन्न प्रमाणपत्र", "जात प्रमाणपत्र", "आधार कार्ड", "PMAY पोर्टलवर अर्ज"]
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "सर्व" || scheme.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2 className="text-3xl font-bold text-foreground mb-8">शासन आपल्या दारी</h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="योजना शोधा..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Filter className="w-4 h-4 mt-2 text-muted-foreground" />
        {filterOptions.map((filter) => (
          <Badge
            key={filter}
            variant={activeFilter === filter ? "default" : "secondary"}
            className={`cursor-pointer px-4 py-2 ${
              activeFilter === filter 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="relative">
            <div className="bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 p-6">
              {/* Scheme Header */}
              <div className="flex items-start justify-between mb-4">
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {scheme.category}
                </Badge>
                <Badge 
                  variant={scheme.status === "Live" ? "default" : "destructive"}
                  className="text-xs"
                >
                  {scheme.status === "Live" ? "सक्रिय" : "संपलेली"}
                </Badge>
              </div>

              {/* Scheme Title */}
              <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                {scheme.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {scheme.description}
              </p>

              {/* Benefit Amount */}
              <div className="mb-4">
                <div className="flex items-center text-primary font-bold text-lg">
                  <span className="mr-1">💰</span>
                  {scheme.amount}
                </div>
                <p className="text-sm text-muted-foreground mt-1">लाभ रक्कम</p>
              </div>

              {/* Eligibility */}
              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">पात्रता:</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {scheme.eligibility}
                </p>
              </div>

              {/* How to Apply */}
              {scheme.howToApply && (
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">अर्ज कसा करा:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {scheme.howToApply.slice(0, 2).map((step, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* View More Button */}
              <Button 
                onClick={() => onSchemeClick(scheme)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                अधिक तपशील पहा
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySchemes;