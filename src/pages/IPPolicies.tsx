import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Wand2, Database } from "lucide-react";
import { hasNationalModel, getRegionalModel, getPolicyModelType, getNationalModelInfo } from "@/data/countryPolicyData";

const IPPolicies = () => {
  const { country } = useParams();
  const navigate = useNavigate();

  const countrySlug = country?.toLowerCase() || "";
  const countryName = country?.replace(/-/g, " ") || "";
  const modelType = getPolicyModelType(countrySlug);
  const nationalInfo = getNationalModelInfo(countrySlug);
  const regionalInfo = getRegionalModel(countrySlug);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/external/country/${country}/ip-tools`)}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to IP Tools
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Institutional IP Policies</h1>
          <p className="text-muted-foreground text-lg">
            {countryName} - Policy Frameworks and Resources
          </p>
        </div>

        <div className={`grid gap-6 ${modelType === "toolkit-only" ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {/* National Model - only for specific countries */}
          {modelType === "national" && (
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate(`/external/country/${country}/ip-policies/model`)}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">National Model</CardTitle>
                <CardDescription>
                  National Model for Institutional IP Policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">
                  Access the national framework developed specifically for {countryName}'s institutions.
                </p>
                {nationalInfo && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Available in: {nationalInfo.languages.join(", ")}
                  </p>
                )}
                <Button variant="default" className="w-full">
                  View National Model
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Regional Model - only for countries in Africa, ASEAN, or CARD */}
          {modelType === "regional" && regionalInfo && (
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate(`/external/country/${country}/ip-policies/model`)}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Regional Model</CardTitle>
                <CardDescription>
                  {regionalInfo.name} Regional Model for IP Policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Access the regional framework applicable to institutions in the {regionalInfo.name} region.
                </p>
                <Button variant="default" className="w-full">
                  View Regional Model
                </Button>
              </CardContent>
            </Card>
          )}

          {/* WIPO IP Policy Toolkit - always shown */}
          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={() => navigate(`/external/country/${country}/ip-policies/toolkit`)}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-xl">WIPO IP Policy Toolkit</CardTitle>
              <CardDescription>
                AI-Powered Policy Template Customization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Customize the IP Policy Template for Academic and Research Institutions with AI assistance.
              </p>
              <Button variant="default" className="w-full bg-accent hover:bg-accent/90">
                Open Toolkit
              </Button>
            </CardContent>
          </Card>

          {/* Institutional IP Policies Database - always shown */}
          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={() => navigate(`/external/country/${country}/ip-policies/database`)}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Policies Database</CardTitle>
              <CardDescription>
                Institutional IP Policies from Around the World
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Browse and search through IP policies from institutions worldwide.
              </p>
              <Button variant="outline" className="w-full">
                Browse Database
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* No model available message */}
        {modelType === "toolkit-only" && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed">
            <p className="text-muted-foreground text-sm text-center">
              <strong>Note:</strong> There is no national or regional model available for {countryName} at this time. 
              You can use the WIPO IP Policy Toolkit to create a customized policy for your institution.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IPPolicies;
