import { User, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const MyProfile = () => {
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(false);

  const completedAppointments = [
    {
      id: "1",
      schemeName: "PM Awas Yojana",
      date: "10 Aug 2025",
      status: "Completed"
    },
    {
      id: "2",
      schemeName: "Kisan Credit Card",
      date: "25 Jul 2025", 
      status: "Completed"
    }
  ];

  const upcomingAppointments = [
    {
      id: "1",
      schemeName: "Mazhi Ladki Bahin Yojana",
      date: "15 Sept 2025",
      time: "11:30 AM"
    },
    {
      id: "2",
      schemeName: "PM Kisan Yojana", 
      date: "20 Sept 2025",
      time: "2:00 PM"
    }
  ];

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-foreground mb-6">My Profile</h2>
      
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* User Information Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <p className="text-foreground">Rahul Patil</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Address</label>
            <p className="text-foreground">At. Post Varsus, Tal. Sakri, Dist. Dhule</p>
          </div>
        </CardContent>
      </Card>

      {/* Completed Appointments */}
      <Card className="mb-4">
        <Collapsible open={isCompletedOpen} onOpenChange={setIsCompletedOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Completed Appointments
                </CardTitle>
                {isCompletedOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {completedAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{appointment.schemeName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-200">
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <Collapsible open={isUpcomingOpen} onOpenChange={setIsUpcomingOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Upcoming Appointments
                </CardTitle>
                {isUpcomingOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{appointment.schemeName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.date}, {appointment.time}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200">
                      Scheduled
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default MyProfile;