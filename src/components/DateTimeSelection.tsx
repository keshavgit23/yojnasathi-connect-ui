import { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateTimeSelectionProps {
  onDateTimeSelect: (date: Date, time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const DateTimeSelection = ({ onDateTimeSelect, selectedDate, selectedTime }: DateTimeSelectionProps) => {
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [time, setTime] = useState<string>(selectedTime || "");

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      if (time) {
        onDateTimeSelect(selectedDate, time);
      }
    }
  };

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    if (date) {
      onDateTimeSelect(date, selectedTime);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Choose Appointment Date & Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date() || date < new Date("2024-01-01")}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        {date && (
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Select Time Slot
            </Label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={time === slot ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimeSelect(slot)}
                  className="text-xs"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateTimeSelection;