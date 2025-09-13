import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import SchemeCard from "@/components/SchemeCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const defaultSchemes = [
    {
      title: "Mazhi Ladki Bahin Yojana",
      description: "Financial assistance scheme for women empowerment and support in Maharashtra",
      category: "Women Welfare",
      beneficiaries: "Women aged 21-65",
      amount: "₹1,500 per month",
      deadline: "Dec 31, 2024"
    },
    {
      title: "PM Kisan Yojana",
      description: "Direct income support to farmers for agriculture and allied activities",
      category: "Agriculture",
      beneficiaries: "Small & marginal farmers",
      amount: "₹6,000 per year",
      deadline: "Ongoing"
    },
    {
      title: "Majur Kamgar Bhandkam Yojana",
      description: "Social security and welfare scheme for construction workers and laborers",
      category: "Labor Welfare",
      beneficiaries: "Construction workers",
      amount: "Various benefits",
      deadline: "Mar 31, 2025"
    },
    {
      title: "Pradhan Mantri Awas Yojana",
      description: "Housing for All mission providing affordable housing to eligible families",
      category: "Housing",
      beneficiaries: "EWS, LIG, MIG families",
      amount: "Up to ₹2.67 lakh subsidy",
      deadline: "Dec 31, 2024"
    }
  ];

  const handleSchemeClick = (schemeTitle: string) => {
    toast({
      title: "Scheme Selected",
      description: `Opening details for ${schemeTitle}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Search */}
        <section className="py-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary">YojnaSathi</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your trusted companion to discover and access government schemes. 
            Find the right schemes for you and your family.
          </p>
          
          {/* Search Bar */}
          <SearchBar />
        </section>
        
        {/* Default Schemes Section */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Popular Schemes</h2>
            <button className="text-primary hover:text-primary/80 font-medium">
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {defaultSchemes.map((scheme, index) => (
              <SchemeCard
                key={index}
                title={scheme.title}
                description={scheme.description}
                category={scheme.category}
                beneficiaries={scheme.beneficiaries}
                amount={scheme.amount}
                deadline={scheme.deadline}
                onClick={() => handleSchemeClick(scheme.title)}
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
              <h3 className="font-semibold text-foreground mb-2">Search Schemes</h3>
              <p className="text-muted-foreground text-sm">
                Find government schemes tailored to your needs
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Apply Online</h3>
              <p className="text-muted-foreground text-sm">
                Submit applications directly through our platform
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Track Progress</h3>
              <p className="text-muted-foreground text-sm">
                Monitor your application status and appointments
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
