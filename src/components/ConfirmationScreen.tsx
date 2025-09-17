import { CheckCircle, Calendar, MapPin, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentDetails {
  schemeName: string;
  cscName: string;
  appointmentType: string;
  charge: string;
  date: string;
  time: string;
}

interface ConfirmationScreenProps {
  appointmentDetails: AppointmentDetails;
  onGoHome: () => void;
}

const ConfirmationScreen = ({ appointmentDetails, onGoHome }: ConfirmationScreenProps) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t('confirmation.appointmentConfirmed')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('confirmation.successMessage')}
        </p>
      </div>

      {/* Appointment Details Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            {t('confirmation.appointmentDetails')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Scheme Name */}
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <span className="text-muted-foreground">{t('appointments.scheme')}:</span>
            <span className="font-medium text-foreground">{appointmentDetails.schemeName}</span>
          </div>

          {/* Appointment Type */}
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <span className="text-muted-foreground">{t('appointments.type')}:</span>
            <div className="flex items-center">
              <span className="font-medium text-foreground capitalize mr-2">
                {appointmentDetails.appointmentType === "normal" ? t('applyForm.normalAppointment') : t('applyForm.urgentAppointment')}
              </span>
              {appointmentDetails.appointmentType === "urgent" && (
                <Badge variant="destructive" className="text-xs">{t('applyForm.priority')}</Badge>
              )}
            </div>
          </div>

          {/* CSC Center */}
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{t('appointments.center')}:</span>
            </div>
            <span className="font-medium text-foreground">{appointmentDetails.cscName}</span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{t('confirmation.dateTime')}</span>
            </div>
            <span className="font-medium text-foreground">
              {appointmentDetails.date}, {appointmentDetails.time}
            </span>
          </div>

          {/* Charges */}
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center text-muted-foreground">
              <IndianRupee className="w-4 h-4 mr-1" />
              <span>{t('appointments.charges')}:</span>
            </div>
            <span className="font-medium text-primary text-lg">
              {appointmentDetails.charge}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
            <div className="text-left">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                {t('confirmation.importantInstructions')}
              </h3>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>{t('confirmation.arrive15Minutes')}</li>
                <li>{t('confirmation.carryDocuments')}</li>
                <li>{t('confirmation.feeAtCenter')}</li>
                <li>{t('confirmation.viewInAppointments')}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button 
          onClick={onGoHome}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
        >
          {t('confirmation.goToAppointments')}
        </Button>
        <Button 
          variant="outline" 
          onClick={onGoHome}
          className="w-full"
        >
          {t('confirmation.backToHome')}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;