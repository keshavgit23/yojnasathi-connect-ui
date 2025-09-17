import { useState } from "react";
import { ArrowLeft, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import LocationSelection from "./LocationSelection";
import DateTimeSelection from "./DateTimeSelection";
import CSCAvailability from "./CSCAvailability";
import { useLanguage } from "@/contexts/LanguageContext";


interface ApplyFormProps {
  schemeName: string;
  onBack: () => void;
  onConfirm: (appointmentDetails: any) => void;
}

const ApplyForm = ({ schemeName, onBack, onConfirm }: ApplyFormProps) => {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCSC, setSelectedCSC] = useState("");
  const [appointmentType, setAppointmentType] = useState("");

  const showDateTimeSelection = selectedState && selectedDistrict && selectedTaluka;
  const showCSCList = showDateTimeSelection && selectedDate && selectedTime;

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    if (!selectedCSC || !appointmentType || !selectedDate || !selectedTime) return;

    const cscNames = {
      "1": "CSC Sakri Center",
      "2": "Jan Aushadhi eSeva Kendra", 
      "3": "Gramin eSeva Center"
    };

    const appointmentDetails = {
      schemeName,
      cscName: cscNames[selectedCSC as keyof typeof cscNames],
      appointmentType,
      charge: appointmentType === "normal" ? "₹150" : "₹300",
      date: selectedDate.toLocaleDateString("en-GB", { 
        day: "2-digit", 
        month: "short", 
        year: "numeric" 
      }),
      time: selectedTime
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
        {t('applyForm.backToSchemeDetails')}
      </Button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {t('apply.title')} {schemeName}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('apply.selectLocation')}
        </p>
      </div>

      {/* Location Selection */}
      <div className="mb-6">
        <LocationSelection
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          selectedTaluka={selectedTaluka}
          onStateChange={setSelectedState}
          onDistrictChange={setSelectedDistrict}
          onTalukaChange={setSelectedTaluka}
        />
      </div>

      {/* Date & Time Selection */}
      {showDateTimeSelection && (
        <div className="mb-6">
          <DateTimeSelection
            onDateTimeSelect={handleDateTimeSelect}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      )}

      {/* CSC Centers List */}
      {showCSCList && (
        <div className="mb-6">
          <CSCAvailability
            selectedCSC={selectedCSC}
            onCSCSelect={setSelectedCSC}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      )}

      {/* Appointment Type Selection */}
      {selectedCSC && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {t('applyForm.selectAppointmentType')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={appointmentType} onValueChange={setAppointmentType} className="space-y-3">
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{t('applyForm.normalAppointment')}</h4>
                      <p className="text-sm text-muted-foreground">{t('applyForm.standardProcessing')}</p>
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
                        {t('applyForm.urgentAppointment')}
                        <Badge variant="destructive" className="ml-2 text-xs">{t('applyForm.priority')}</Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground">{t('applyForm.fastTrackProcessing')}</p>
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
      {selectedCSC && appointmentType && selectedDate && selectedTime && (
        <Button 
          onClick={handleConfirmAppointment}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
        >
          {t('applyForm.confirmAppointment')}
        </Button>
      )}
    </div>
  );
};

export default ApplyForm;