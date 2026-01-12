import { Link } from "react-router-dom";
import { Globe, Shield, ArrowRight, BookOpen, BarChart3, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-primary-foreground">IES</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            IES Bloom
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            Innovation Ecosystem Solutions
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            WIPO's comprehensive platform for IP resources, country intelligence, and policy development
          </p>
        </div>

        {/* Interface Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* External Interface Card */}
          <Link to="/external" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/30 bg-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">External Interface</h2>
                    <p className="text-muted-foreground">Public Access</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Browse and explore WIPO IP resources, tools, benchbooks, and institutional policy frameworks organized by country.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-foreground">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>IP Benchbooks & Resources</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Country-specific IP Tools</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Globe className="h-4 w-4 text-primary" />
                    <span>Regional Policy Models</span>
                  </li>
                </ul>

                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Enter Public Portal</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Internal Interface Card */}
          <Link to="/internal/login" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-accent/30 bg-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Internal Interface</h2>
                    <p className="text-muted-foreground">WIPO Staff Only</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Dashboard-driven analytical workspace for mission preparation, strategic planning, and AI-assisted insights.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-foreground">
                    <BarChart3 className="h-4 w-4 text-accent" />
                    <span>Country & Stakeholder Intelligence</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>AI-Powered Document Analysis</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <BookOpen className="h-4 w-4 text-accent" />
                    <span>IP Policy Drafting Workflows</span>
                  </li>
                </ul>

                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  <span>Staff Login</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm">
          <p>World Intellectual Property Organization</p>
          <p className="mt-1">Innovation Ecosystem Section</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
