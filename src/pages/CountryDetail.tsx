import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Wrench, ArrowLeft } from "lucide-react";

const CountryDetail = () => {
  const { country } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/external")}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Countries
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {country?.replace(/-/g, " ")}
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a resource category to explore
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={() => navigate(`/external/country/${country}/reports`)}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Reports</CardTitle>
              <CardDescription>
                Access comprehensive reports and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Browse through publicly available IP reports, statistics, and analysis documents.
              </p>
              <Button variant="outline" className="w-full">
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={() => navigate(`/external/country/${country}/ip-tools`)}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">IP Tools</CardTitle>
              <CardDescription>
                Intellectual Property resources and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access specialized IP tools, benchbooks, and policy frameworks.
              </p>
              <Button variant="default" className="w-full">
                Explore IP Tools
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
