import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationSelectionProps {
  selectedState: string;
  selectedDistrict: string;
  selectedTaluka: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  onTalukaChange: (taluka: string) => void;
}

const LocationSelection = ({
  selectedState,
  selectedDistrict,
  selectedTaluka,
  onStateChange,
  onDistrictChange,
  onTalukaChange
}: LocationSelectionProps) => {
  const { t } = useLanguage();
  const states = ["Maharashtra", "Gujarat", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Karnataka", "Tamil Nadu"];
  
  const getDistricts = (state: string) => {
    const districtMap: Record<string, string[]> = {
      "Maharashtra": ["Dhule", "Nashik", "Pune", "Mumbai", "Aurangabad", "Nagpur", "Kolhapur"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Junagadh"],
      "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar"],
      "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Ghaziabad"],
      "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Ratlam"],
      "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davangere"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Erode"]
    };
    return districtMap[state] || [];
  };

  const getTalukas = (district: string) => {
    const talukaMap: Record<string, string[]> = {
      "Dhule": ["Sakri", "Shirpur", "Sindkheda", "Nandurbar", "Dondaicha", "Shindkheda", "Taloda"],
      "Nashik": ["Nashik", "Malegaon", "Sinnar", "Niphad", "Yeola", "Baglan", "Kalwan"],
      "Pune": ["Pune City", "Pimpri", "Baramati", "Maval", "Bhor", "Daund", "Indapur"],
      "Mumbai": ["Andheri", "Borivali", "Kurla", "Bandra", "Colaba", "Thane", "Mulund"],
      "Aurangabad": ["Aurangabad", "Jalna", "Beed", "Osmanabad", "Latur", "Nanded", "Parbhani"]
    };
    return talukaMap[district] || ["Taluka 1", "Taluka 2", "Taluka 3", "Taluka 4", "Taluka 5"];
  };

  const districts = selectedState ? getDistricts(selectedState) : [];
  const talukas = selectedDistrict ? getTalukas(selectedDistrict) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          {t("location.selectYourLocation")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">{t("location.state")}</Label>
            <Select value={selectedState} onValueChange={onStateChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("location.selectState")} />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">{t("location.district")}</Label>
            <Select 
              value={selectedDistrict} 
              onValueChange={onDistrictChange}
              disabled={!selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("location.selectDistrict")} />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">{t("location.taluka")}</Label>
            <Select 
              value={selectedTaluka} 
              onValueChange={onTalukaChange}
              disabled={!selectedDistrict}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("location.selectTaluka")} />
              </SelectTrigger>
              <SelectContent>
                {talukas.map((taluka) => (
                  <SelectItem key={taluka} value={taluka}>{taluka}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSelection;