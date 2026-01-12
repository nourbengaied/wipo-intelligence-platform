import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, ExternalLink, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  hasNationalModel, 
  getRegionalModel, 
  getPolicyModelType, 
  getNationalModelInfo 
} from "@/data/countryPolicyData";

const PolicyModel = () => {
  const { country } = useParams();
  const navigate = useNavigate();

  const countrySlug = country?.toLowerCase() || "";
  const countryName = country?.replace(/-/g, " ") || "";
  const modelType = getPolicyModelType(countrySlug);
  const nationalInfo = getNationalModelInfo(countrySlug);
  const regionalInfo = getRegionalModel(countrySlug);

  // If toolkit-only, redirect back
  if (modelType === "toolkit-only") {
    navigate(`/external/country/${country}/ip-policies`);
    return null;
  }

  const isNational = modelType === "national";
  const modelTitle = isNational ? "National Model" : `${regionalInfo?.name} Regional Model`;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/external/country/${country}/ip-policies`)}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to IP Policies
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {modelTitle} for Institutional IP Policies
          </h1>
          <p className="text-muted-foreground text-lg">
            {countryName}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Document Preview */}
          <div className="lg:col-span-2 bg-card rounded-xl shadow-md border overflow-hidden">
            <div className="bg-primary/10 p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">
                  {modelTitle} Document
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Full
                </Button>
              </div>
            </div>
            <div className="h-[600px] bg-muted/30 flex items-center justify-center">
              <div className="text-center p-8">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {modelTitle} PDF Document
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Connect a PDF viewer to display the document
                </p>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl shadow-md border p-6">
              <h3 className="font-semibold text-lg mb-4">About This Model</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {isNational
                  ? `This national model has been developed specifically for ${countryName} to address the unique intellectual property needs of its academic and research institutions.`
                  : `This regional model provides a framework for institutions in the ${regionalInfo?.name} region where a specific national model has not yet been developed.`}
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant={isNational ? "default" : "secondary"}>
                    {isNational ? "National" : "Regional"} Model
                  </Badge>
                </div>
                {isNational && nationalInfo && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Languages:</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {nationalInfo.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          <Globe className="h-3 w-3 mr-1" />
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {!isNational && regionalInfo && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="font-medium">{regionalInfo.name}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">2024</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-md border p-6">
              <h3 className="font-semibold text-lg mb-4">Key Sections</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Preamble and Definitions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Scope and Application
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  IP Ownership and Rights
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Revenue Sharing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Dispute Resolution
                </li>
              </ul>
            </div>

            {isNational && (
              <div className="bg-accent/10 rounded-xl border border-accent/20 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> This national model 
                  has been developed in collaboration with {countryName}'s IP authorities 
                  and is tailored to local legal and institutional frameworks.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyModel;
