import { useState } from "react";
import { Search, FileText, Calendar, Users, TrendingUp, MessageSquare, ArrowRightLeft, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const countries = [
  "Kenya", "Brazil", "Indonesia", "Ghana", "India", "Nigeria", "Philippines", 
  "South Africa", "Vietnam", "Colombia", "Morocco", "Thailand", "Egypt", "Mexico"
];

const countryData = {
  Kenya: {
    latestMission: { title: "Kenya Country Mission Report Q4 2025", date: "Dec 2025" },
    latestBriefing: { title: "Kenya Country Briefing 2025", date: "Nov 2025" },
    achievements: ["3 IP awareness workshops conducted", "University IP policy drafted", "SME clinic established"],
    events: ["KIPI Annual Conference", "Tech Transfer Workshop", "IP in Agriculture Seminar"],
    stakeholders: 12,
    recommendations: [
      "Strengthen IP office automation",
      "Expand university outreach program",
      "Develop sector-specific IP guides"
    ],
    challenges: [
      "Limited IP office resources",
      "Low awareness in informal sector",
      "Need for specialized IP training"
    ]
  }
};

const CountryIntelligence = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [compareCountry, setCompareCountry] = useState<string>("");

  const filteredCountries = countries.filter(c => 
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const data = selectedCountry ? countryData.Kenya : null; // Using Kenya as mock data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Country Intelligence</h2>
        <p className="text-muted-foreground">
          Comprehensive country-level analysis, insights, and AI-powered tools
        </p>
      </div>

      {/* Country Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a country..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredCountries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedCountry && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Compare with</label>
                <Select value={compareCountry} onValueChange={setCompareCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country to compare..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.filter(c => c !== selectedCountry).map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {!selectedCountry ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map(country => (
            <Card 
              key={country} 
              className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all"
              onClick={() => setSelectedCountry(country)}
            >
              <CardContent className="pt-6">
                <h4 className="font-semibold text-lg">{country}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Click to view intelligence dashboard
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Country Dashboard */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{selectedCountry} Dashboard</h3>
            <Button variant="outline" onClick={() => setSelectedCountry("")}>
              Back to all countries
            </Button>
          </div>

          {/* Snapshot Tiles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Latest Mission Report</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-sm">{data?.latestMission.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{data?.latestMission.date}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Latest Country Briefing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-sm">{data?.latestBriefing.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{data?.latestBriefing.date}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Stakeholders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{data?.stakeholders}</p>
                <p className="text-xs text-muted-foreground mt-1">IP offices, universities, SMEs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Recent Events</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{data?.events.length}</p>
                <p className="text-xs text-muted-foreground mt-1">In last 12 months</p>
              </CardContent>
            </Card>
          </div>

          {/* AI Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Analysis Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Summarize key findings
                </Button>
                <Button variant="outline" className="gap-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  Compare with another country
                </Button>
                <Button variant="outline" className="gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Identify recurring challenges
                </Button>
                <Button variant="outline" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Show trends over time
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Tabs */}
          <Tabs defaultValue="achievements">
            <TabsList>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="events">Key Events</TabsTrigger>
            </TabsList>
            <TabsContent value="achievements" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {data?.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 bg-success/10 text-success border-success/30">✓</Badge>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="challenges" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {data?.challenges.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 bg-warning/10 text-warning border-warning/30">!</Badge>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recommendations" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {data?.recommendations.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 bg-primary/10 text-primary border-primary/30">→</Badge>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="events" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {data?.events.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default CountryIntelligence;
