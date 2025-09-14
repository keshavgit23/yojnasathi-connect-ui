import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
  const states = ["Maharashtra", "Gujarat", "Rajasthan", "Uttar Pradesh"];
  const districts = selectedState ? ["Dhule", "Nashik", "Pune", "Mumbai"] : [];
  const talukas = selectedDistrict ? ["Sakri", "Shirpur", "Sindkheda", "Nandurbar"] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Select Your Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">State</Label>
            <Select value={selectedState} onValueChange={onStateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">District</Label>
            <Select 
              value={selectedDistrict} 
              onValueChange={onDistrictChange}
              disabled={!selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Taluka</Label>
            <Select 
              value={selectedTaluka} 
              onValueChange={onTalukaChange}
              disabled={!selectedDistrict}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Taluka" />
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