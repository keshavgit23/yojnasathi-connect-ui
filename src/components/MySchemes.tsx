import SchemeCard from "./SchemeCard";
import { Button } from "@/components/ui/button";

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
}

interface MySchemesProps {
  onSchemeClick: (scheme: Scheme) => void;
}

const MySchemes = ({ onSchemeClick }: MySchemesProps) => {
  const schemes: Scheme[] = [
    {
      id: "1",
      title: "Mazhi Ladki Bahin Yojana",
      description: "Financial assistance scheme for women empowerment and support in Maharashtra",
      category: "Women Welfare",
      beneficiaries: "Women aged 21-65",
      amount: "₹1,500 per month",
      deadline: "Dec 31, 2024",
      status: "Live",
      eligibility: "Women residents of Maharashtra aged between 21-65 years with annual family income less than ₹2.5 lakh"
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
      eligibility: "Small and marginal farmers with cultivable land up to 2 hectares"
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
      eligibility: "Registered construction workers with active membership in labor board"
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
      eligibility: "Families without pucca house, annual income criteria based on category"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-6">My Schemes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="relative">
            <SchemeCard
              title={scheme.title}
              description={scheme.description}
              category={scheme.category}
              beneficiaries={scheme.beneficiaries}
              amount={scheme.amount}
              deadline={scheme.deadline}
              onClick={() => onSchemeClick(scheme)}
            />
            <div className="mt-3">
              <Button 
                onClick={() => onSchemeClick(scheme)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySchemes;