import { User, FileText, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const { t } = useLanguage();

  const tabs = [
    { id: "schemes", label: t("nav.mySchemes"), icon: FileText },
    { id: "appointments", label: t("nav.myAppointments"), icon: Calendar },
    { id: "profile", label: t("nav.myProfile"), icon: User },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">{t("nav.brandName")}</span>
          </div>

          {/* Navigation Tabs and Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Navigation Tabs */}
            <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors relative ${
                    isActive
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;