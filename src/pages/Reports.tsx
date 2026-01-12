import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, ExternalLink, Calendar, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { countryReports, globalWIPOReports } from "@/data/countryPolicyData";

const Reports = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  
  const countrySlug = country?.toLowerCase() || "";
  const countryName = country?.replace(/-/g, " ") || "";
  
  // Get country-specific reports
  const specificReports = countryReports[countrySlug] || [];
  
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/external/country/${country}`)}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {countryName}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Reports</h1>
          <p className="text-muted-foreground text-lg">
            {countryName} - Publicly Available IP Reports and Resources
          </p>
        </div>

        {/* Country-Specific Reports */}
        {specificReports.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {countryName} Reports
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {specificReports.map((report, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">
                          {report.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Badge variant="secondary">{report.type}</Badge>
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {report.source}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.year}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="gap-2"
                          asChild
                        >
                          <a href={report.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                            View Report
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Global WIPO Reports */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            WIPO Global Reports
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            Access global IP statistics and reports that include data for {countryName}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {globalWIPOReports.map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {report.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Badge variant="outline">{report.type}</Badge>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {report.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.year}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="gap-2"
                        asChild
                      >
                        <a href={report.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                          View Report
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No specific reports message */}
        {specificReports.length === 0 && (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-2">No Country-Specific Reports Available</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                We don't have specific reports for {countryName} yet. 
                Please refer to the WIPO Global Reports above for relevant data, 
                or check back later as we continue to expand our collection.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;
