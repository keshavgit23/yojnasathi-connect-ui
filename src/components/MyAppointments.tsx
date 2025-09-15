import { Calendar, MapPin, FileText, Clock, Building2, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentProps {
  appointments: Array<{
    id: string;
    schemeName: string;
    schemeKey?: string;
    centerName: string;
    date: string;
    time: string;
    status: string;
    appointmentType: string;
    charges: string;
  }>;
}

const MyAppointments = ({ appointments = [] }: AppointmentProps) => {
  const { t } = useLanguage();

  const getSchemeTranslation = (schemeName: string, schemeKey?: string) => {
    if (schemeKey) {
      return t(schemeKey);
    }
    // Fallback to original name if no key provided
    return schemeName;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-6">{t("appointments.title")}</h2>
      
      {appointments.length === 0 ? (
        <Card className="bg-card text-center p-8">
          <div className="text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg">{t("appointments.noAppointments")}</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="bg-card hover:bg-card/80 transition-colors border border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Scheme Name - Large and Bold */}
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <span className="text-sm text-muted-foreground font-medium">{t("appointments.scheme")}:</span>
                      <h3 className="text-xl font-bold text-foreground">
                        {getSchemeTranslation(appointment.schemeName, appointment.schemeKey)}
                      </h3>
                    </div>
                  </div>

                  {/* Appointment Type - Bold and Color Highlighted */}
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <span className="text-sm text-muted-foreground font-medium">{t("appointments.type")}:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-foreground">
                          {appointment.appointmentType === "urgent" ? t("common.urgent") : t("common.normal")}
                        </span>
                        {appointment.appointmentType === "urgent" && (
                          <Badge variant="destructive" className="text-xs font-bold">
                            {t("common.urgent")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Center Name - Bold */}
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <span className="text-sm text-muted-foreground font-medium">{t("appointments.center")}:</span>
                      <p className="text-lg font-bold text-foreground">{appointment.centerName}</p>
                    </div>
                  </div>

                  {/* Date & Time - Bold Dark Blue */}
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <span className="text-sm text-muted-foreground font-medium">{t("common.date")} & {t("common.time")}:</span>
                      <p className="text-lg font-bold text-primary">{appointment.date}, {appointment.time}</p>
                    </div>
                  </div>

                  {/* Charges - Bold Red for Urgent, Bold Black for Normal */}
                  <div className="flex items-center">
                    <IndianRupee className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <span className="text-sm text-muted-foreground font-medium">{t("appointments.charges")}:</span>
                      <p className={`text-lg font-bold ${
                        appointment.appointmentType === "urgent" 
                          ? "text-destructive" 
                          : "text-foreground"
                      }`}>
                        {appointment.charges}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-end">
                    <Badge 
                      variant={appointment.status === "Confirmed" ? "default" : "secondary"}
                      className={`font-bold ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }`}
                    >
                      {appointment.status === "Confirmed" ? t("common.confirmed") : t("common.pending")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;