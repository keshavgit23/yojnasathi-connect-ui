import { ArrowRight, Users, IndianRupee } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SchemeCardProps {
  title: string;
  description: string;
  category: string;
  beneficiaries?: string;
  amount?: string;
  deadline?: string;
  onClick?: () => void;
}

const SchemeCard = ({ 
  title, 
  description, 
  category, 
  beneficiaries, 
  amount, 
  deadline, 
  onClick 
}: SchemeCardProps) => {
  return (
    <Card 
      className="bg-scheme-card hover:bg-scheme-card-hover transition-all duration-200 cursor-pointer border border-border hover:border-primary/30 hover:shadow-md group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2 bg-gov-blue-light text-primary">
            {category}
          </Badge>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          {beneficiaries && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              <span>{beneficiaries}</span>
            </div>
          )}
          
          {amount && (
            <div className="flex items-center text-sm text-muted-foreground">
              <IndianRupee className="w-4 h-4 mr-2" />
              <span>{amount}</span>
            </div>
          )}
          
          {deadline && (
            <div className="text-sm text-destructive font-medium">
              Deadline: {deadline}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemeCard;