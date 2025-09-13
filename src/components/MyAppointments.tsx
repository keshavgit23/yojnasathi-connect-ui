import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyAppointments = () => {
  const appointments = [
    {
      id: "1",
      schemeName: "Mazhi Ladki Bahin Yojana",
      centerName: "CSC Sakri Center",
      date: "15 Sept 2025",
      time: "11:30 AM",
      status: "Confirmed"
    },
    {
      id: "2", 
      schemeName: "PM Kisan Yojana",
      centerName: "eSeva Dhule",
      date: "20 Sept 2025",
      time: "2:00 PM",
      status: "Pending"
    },
    {
      id: "3",
      schemeName: "Majur Kamgar Bhandkam Yojana", 
      centerName: "CSC Varsus Center",
      date: "25 Sept 2025",
      time: "10:00 AM",
      status: "Confirmed"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-6">My Appointments</h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="bg-card hover:bg-card/80 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">
                {appointment.schemeName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{appointment.centerName}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{appointment.date}, {appointment.time}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === "Confirmed" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}>
                  {appointment.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;