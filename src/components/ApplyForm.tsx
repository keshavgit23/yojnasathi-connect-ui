import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Users, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CSCCenter {
  id: string;
  name: string;
  location: string;
  crowdStatus: "Low" | "Medium" | "High";
}

interface ApplyFormProps {
  schemeName: string;
  onBack: () => void;
  onConfirm: (appointmentDetails: any) => void;
}

const ApplyForm = ({ schemeName, onBack, onConfirm }: ApplyFormProps) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedCSC, setSelectedCSC] = useState("");
  const [appointmentType, setAppointmentType] = useState("");

  const states = ["Maharashtra", "Gujarat", "Rajasthan", "Uttar Pradesh"];
  const districts = selectedState ? ["Dhule", "Nashik", "Pune", "Mumbai"] : [];
  const talukas = selectedDistrict ? ["Sakri", "Shirpur", "Sindkheda", "Nandurbar"] : [];

  const cscCenters: CSCCenter[] = [
    {
      id: "1",
      name: "CSC Sakri Center",
      location: "Sakri, Dhule",
      crowdStatus: "Low"
    },
    {
      id: "2", 
      name: "Jan Aushadhi eSeva Kendra",
      location: "Varsus, Sakri",
      crowdStatus: "Medium"
    },
    {
      id: "3",
      name: "Gramin eSeva Center",
      location: "Nandurbar, Dhule", 
      crowdStatus: "High"
    }
  ];

  const showCSCList = selectedState && selectedDistrict && selectedTaluka;

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

  const handleConfirmAppointment = () => {
    if (!selectedCSC || !appointmentType) return;

    const selectedCenter = cscCenters.find(center => center.id === selectedCSC);
    const appointmentDetails = {
      schemeName,
      cscName: selectedCenter?.name,
      appointmentType,
      charge: appointmentType === "normal" ? "₹150" : "₹300",
      date: "15 Sept 2025",
      time: "11:30 AM"
    };

    onConfirm(appointmentDetails);
  };

  return (
    <div className="max-w-4xl">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Scheme Details
      </Button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Apply for {schemeName}
        </h1>
        <p className="text-lg text-muted-foreground">
          Select your location to find nearby eSeva/CSC centers
        </p>
      </div>

      {/* Location Selection */}
      <Card className="mb-6">
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
              <Select value={selectedState} onValueChange={setSelectedState}>
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
                onValueChange={setSelectedDistrict}
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
                onValueChange={setSelectedTaluka}
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

      {/* CSC Centers List */}
      {showCSCList && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Available eSeva/CSC Centers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedCSC} onValueChange={setSelectedCSC} className="space-y-3">
              {cscCenters.map((center) => (
                <div key={center.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent">
                  <RadioGroupItem value={center.id} id={center.id} />
                  <Label htmlFor={center.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{center.name}</h4>
                        <p className="text-sm text-muted-foreground">{center.location}</p>
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
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Appointment Type Selection */}
      {selectedCSC && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Select Appointment Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={appointmentType} onValueChange={setAppointmentType} className="space-y-3">
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Normal Appointment</h4>
                      <p className="text-sm text-muted-foreground">Standard processing time</p>
                    </div>
                    <div className="flex items-center text-primary">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-semibold">150</span>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground flex items-center">
                        Urgent Appointment
                        <Badge variant="destructive" className="ml-2 text-xs">Priority</Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground">Fast-track processing</p>
                    </div>
                    <div className="flex items-center text-destructive">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-semibold">300</span>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Confirm Button */}
      {selectedCSC && appointmentType && (
        <Button 
          onClick={handleConfirmAppointment}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
        >
          Confirm Appointment
        </Button>
      )}
    </div>
  );
};

export default ApplyForm;