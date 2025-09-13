import { ArrowLeft, Users, IndianRupee, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  beneficiaries: string;
  amount: string;
  deadline: string;
  status: "Live" | "Over";
  eligibility: string;
}

interface SchemeDetailProps {
  scheme: Scheme;
  onBack: () => void;
}

const SchemeDetail = ({ scheme, onBack }: SchemeDetailProps) => {
  return (
    <div className="max-w-4xl">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Schemes
      </Button>

      {/* Scheme Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{scheme.title}</h1>
            <Badge 
              variant="secondary" 
              className={`${
                scheme.status === "Live" 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              <div className="flex items-center">
                {scheme.status === "Live" ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <Clock className="w-3 h-3 mr-1" />
                )}
                {scheme.status}
              </div>
            </Badge>
          </div>
          {scheme.status === "Live" && (
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Apply Now
            </Button>
          )}
        </div>
        <p className="text-lg text-muted-foreground">{scheme.description}</p>
      </div>

      {/* Scheme Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Category Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="bg-gov-blue-light text-primary">
              {scheme.category}
            </Badge>
          </CardContent>
        </Card>

        {/* Beneficiaries Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Beneficiaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{scheme.beneficiaries}</p>
          </CardContent>
        </Card>

        {/* Amount Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center">
              <IndianRupee className="w-5 h-5 mr-2" />
              Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-primary">{scheme.amount}</p>
          </CardContent>
        </Card>

        {/* Deadline Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`font-medium ${
              scheme.status === "Over" ? "text-destructive" : "text-muted-foreground"
            }`}>
              {scheme.deadline}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Eligibility Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Eligibility Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{scheme.eligibility}</p>
        </CardContent>
      </Card>

      {/* Apply Button for mobile */}
      {scheme.status === "Live" && (
        <div className="mt-8 md:hidden">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
            Apply Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default SchemeDetail;