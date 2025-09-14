import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface CSCCenter {
  id: string;
  name: string;
  location: string;
  crowdStatus: "Low" | "Medium" | "High";
  availableSlots: string[];
}

interface CSCAvailabilityProps {
  selectedCSC: string;
  onCSCSelect: (cscId: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const CSCAvailability = ({ selectedCSC, onCSCSelect, selectedDate, selectedTime }: CSCAvailabilityProps) => {
  const cscCenters: CSCCenter[] = [
    {
      id: "1",
      name: "CSC Sakri Center",
      location: "Sakri, Dhule",
      crowdStatus: "Low",
      availableSlots: ["11:00 AM", "2:00 PM", "4:30 PM"]
    },
    {
      id: "2", 
      name: "Jan Aushadhi eSeva Kendra",
      location: "Varsus, Sakri",
      crowdStatus: "Medium",
      availableSlots: ["10:30 AM", "1:00 PM", "3:30 PM"]
    },
    {
      id: "3",
      name: "Gramin eSeva Center",
      location: "Nandurbar, Dhule", 
      crowdStatus: "High",
      availableSlots: ["12:00 PM", "5:00 PM"]
    }
  ];

  const getCrowdStatusColor = (status: string) => {
    switch (status) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600"; 
      case "High": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  const getCrowdStatusDot = (status: string) => {
    switch (status) {
      case "Low": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "High": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const isSlotAvailable = (center: CSCCenter) => {
    if (!selectedTime) return true;
    return center.availableSlots.includes(selectedTime);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Available eSeva/CSC Centers
        </CardTitle>
        {selectedDate && selectedTime && (
          <p className="text-sm text-muted-foreground">
            Showing availability for {selectedTime}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedCSC} onValueChange={onCSCSelect} className="space-y-3">
          {cscCenters.map((center) => {
            const available = isSlotAvailable(center);
            return (
              <div 
                key={center.id} 
                className={cn(
                  "flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent",
                  !available && "opacity-50"
                )}
              >
                <RadioGroupItem 
                  value={center.id} 
                  id={center.id} 
                  disabled={!available}
                />
                <Label htmlFor={center.id} className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{center.name}</h4>
                        {!available && (
                          <Badge variant="secondary" className="text-xs">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{center.location}</p>
                      {selectedDate && selectedTime && available && (
                        <p className="text-xs text-primary mt-1">
                          Available slots: {center.availableSlots.join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getCrowdStatusDot(center.crowdStatus)} mr-2`}></div>
                      <span className={`text-sm font-medium ${getCrowdStatusColor(center.crowdStatus)}`}>
                        {center.crowdStatus} Crowd
                      </span>
                    </div>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default CSCAvailability;