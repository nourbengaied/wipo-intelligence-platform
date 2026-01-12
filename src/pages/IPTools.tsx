import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileCheck, ArrowLeft } from "lucide-react";

const IPTools = () => {
  const { country } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/external/country/${country}`)}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {country?.replace(/-/g, " ")}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">IP Tools</h1>
          <p className="text-muted-foreground text-lg">
            {country?.replace(/-/g, " ")} - Intellectual Property Resources
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={() => navigate(`/external/country/${country}/benchbook`)}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">IP Benchbook</CardTitle>
              <CardDescription>
                Interactive benchbook with AI-powered assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access the comprehensive IP Benchbook with integrated AI chat for instant answers to your questions.
              </p>
              <Button variant="default" className="w-full">
                Open Benchbook
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={() => navigate(`/external/country/${country}/ip-policies`)}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Institutional IP Policies</CardTitle>
              <CardDescription>
                Policy frameworks, toolkit, and database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access national/regional models, AI-powered policy toolkit, and institutional policies database.
              </p>
              <Button variant="outline" className="w-full">
                Explore Policies
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IPTools;
