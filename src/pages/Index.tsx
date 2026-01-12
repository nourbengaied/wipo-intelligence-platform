import CountryList from "@/components/CountryList";
import { Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Globe className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">
            IES Bloom
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            World Intellectual Property Organization - Access IP tools, benchbooks, and resources by country
          </p>
        </div>

        <CountryList />
      </div>
    </div>
  );
};

export default Index;
