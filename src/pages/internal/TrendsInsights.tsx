import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Download, Filter, Globe, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const trendData = [
  {
    id: 1,
    title: "IP Office Automation",
    direction: "up",
    mentions: 47,
    change: "+23%",
    regions: ["Africa", "Asia Pacific"],
    description: "Increasing focus on digital transformation of IP offices across developing countries",
    sources: ["Kenya Mission Q4", "Indonesia Report", "ARIPO Briefing"],
  },
  {
    id: 2,
    title: "University IP Policies",
    direction: "up",
    mentions: 38,
    change: "+15%",
    regions: ["Africa", "Latin America"],
    description: "Growing adoption of institutional IP policies in academic institutions",
    sources: ["University of Nairobi Review", "Brazil IP Policy Workshop"],
  },
  {
    id: 3,
    title: "SME IP Support Programs",
    direction: "up",
    mentions: 32,
    change: "+8%",
    regions: ["Africa", "Asia Pacific", "Latin America"],
    description: "Expansion of IP clinics and support services for small businesses",
    sources: ["Kenya SME Clinic Report", "Indonesia Stakeholder Mission"],
  },
  {
    id: 4,
    title: "Traditional Knowledge Protection",
    direction: "stable",
    mentions: 25,
    change: "0%",
    regions: ["Africa", "Latin America"],
    description: "Continued discussions on TK documentation and protection mechanisms",
    sources: ["Ghana Workshop Report", "ARIPO Regional Briefing"],
  },
  {
    id: 5,
    title: "IP Enforcement Challenges",
    direction: "up",
    mentions: 21,
    change: "+5%",
    regions: ["Africa", "Asia Pacific"],
    description: "Growing concerns about online IP infringement and enforcement capacity",
    sources: ["Kenya Judiciary Report", "Vietnam Mission"],
  },
];

const barriers = [
  { title: "Limited IP office resources", frequency: 42, regions: ["Africa", "Asia Pacific"] },
  { title: "Low public awareness of IP", frequency: 38, regions: ["Africa", "Latin America", "Asia Pacific"] },
  { title: "Insufficient specialized training", frequency: 31, regions: ["Africa", "Latin America"] },
  { title: "Weak university-industry linkages", frequency: 27, regions: ["Africa", "Asia Pacific"] },
  { title: "Inadequate legal frameworks", frequency: 23, regions: ["Latin America", "Arab"] },
];

const interventions = [
  { title: "Capacity building workshops", frequency: 56, effectiveness: "High" },
  { title: "IP awareness campaigns", frequency: 48, effectiveness: "Medium" },
  { title: "Technical assistance missions", frequency: 42, effectiveness: "High" },
  { title: "Policy development support", frequency: 35, effectiveness: "High" },
  { title: "Digital tools deployment", frequency: 28, effectiveness: "Medium" },
];

const TrendsInsights = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("12m");

  const getTrendIcon = (direction: string) => {
    if (direction === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    if (direction === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trends & Insights</h2>
          <p className="text-muted-foreground">
            Cross-cutting analysis and AI-generated insight cards
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="asia">Asia Pacific</SelectItem>
              <SelectItem value="lac">Latin America</SelectItem>
              <SelectItem value="arab">Arab</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
              <SelectItem value="24m">Last 24 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="trends">
        <TabsList>
          <TabsTrigger value="trends">Emerging Trends</TabsTrigger>
          <TabsTrigger value="barriers">Recurring Barriers</TabsTrigger>
          <TabsTrigger value="interventions">Common Interventions</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-6 space-y-4">
          {trendData.map(trend => (
            <Card key={trend.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {getTrendIcon(trend.direction)}
                      <h4 className="font-semibold text-lg">{trend.title}</h4>
                      <Badge variant={trend.direction === "up" ? "default" : "secondary"}>
                        {trend.change}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2">{trend.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {trend.regions.map(region => (
                        <Badge key={region} variant="outline">{region}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Sources: {trend.sources.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{trend.mentions}</p>
                    <p className="text-xs text-muted-foreground">mentions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="barriers" className="mt-6 space-y-4">
          {barriers.map((barrier, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">{barrier.title}</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {barrier.regions.map(region => (
                        <Badge key={region} variant="outline" className="text-xs">{region}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-warning">{barrier.frequency}</p>
                    <p className="text-xs text-muted-foreground">occurrences</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="interventions" className="mt-6 space-y-4">
          {interventions.map((intervention, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">{intervention.title}</h4>
                    <Badge 
                      variant={intervention.effectiveness === "High" ? "default" : "secondary"}
                      className="mt-2"
                    >
                      {intervention.effectiveness} effectiveness
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">{intervention.frequency}</p>
                    <p className="text-xs text-muted-foreground">deployments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Export */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Export Insights Summary</h4>
              <p className="text-sm text-muted-foreground">Download a summary with cited sources</p>
            </div>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsInsights;
