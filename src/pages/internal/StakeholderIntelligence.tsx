import { useState } from "react";
import { Search, Building2, GraduationCap, Scale, Globe2, Briefcase, MessageSquare, History, Target, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stakeholderTypes = [
  { id: "ip-office", label: "IP Offices", icon: Building2 },
  { id: "university", label: "Universities", icon: GraduationCap },
  { id: "research", label: "Research Institutions", icon: Lightbulb },
  { id: "judiciary", label: "Judiciary", icon: Scale },
  { id: "regional", label: "Regional Organizations", icon: Globe2 },
  { id: "ministry", label: "Ministries", icon: Briefcase },
];

const stakeholders = [
  { id: 1, name: "Kenya Industrial Property Institute (KIPI)", type: "ip-office", country: "Kenya", engagementLevel: "High", lastContact: "Dec 2025" },
  { id: 2, name: "University of Nairobi", type: "university", country: "Kenya", engagementLevel: "Medium", lastContact: "Nov 2025" },
  { id: 3, name: "ARIPO", type: "regional", country: "Regional", engagementLevel: "High", lastContact: "Oct 2025" },
  { id: 4, name: "INPI Brazil", type: "ip-office", country: "Brazil", engagementLevel: "High", lastContact: "Nov 2025" },
  { id: 5, name: "IPB University", type: "university", country: "Indonesia", engagementLevel: "Medium", lastContact: "Sep 2025" },
  { id: 6, name: "DGIP Indonesia", type: "ip-office", country: "Indonesia", engagementLevel: "High", lastContact: "Sep 2025" },
  { id: 7, name: "Kenya Judiciary", type: "judiciary", country: "Kenya", engagementLevel: "Low", lastContact: "Aug 2025" },
  { id: 8, name: "Ministry of Science Brazil", type: "ministry", country: "Brazil", engagementLevel: "Medium", lastContact: "Jul 2025" },
];

const stakeholderDetail = {
  name: "Kenya Industrial Property Institute (KIPI)",
  type: "IP Office",
  country: "Kenya",
  engagementHistory: [
    { date: "Dec 2025", activity: "Country Mission - IP Office assessment" },
    { date: "Oct 2025", activity: "Virtual consultation on automation" },
    { date: "Jul 2025", activity: "Capacity building workshop" },
    { date: "Mar 2025", activity: "Policy discussion meeting" },
  ],
  needs: [
    "IT infrastructure modernization",
    "Staff training on examination",
    "Public awareness campaign support",
    "Regional harmonization guidance"
  ],
  readiness: "Advanced",
  gaps: [
    "Limited digital filing capabilities",
    "Need for specialized examiners",
    "Outreach to informal sector"
  ],
  opportunities: [
    "Strong government commitment",
    "Growing tech startup ecosystem",
    "Regional hub potential"
  ]
};

const StakeholderIntelligence = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStakeholder, setSelectedStakeholder] = useState<typeof stakeholders[0] | null>(null);

  const filteredStakeholders = stakeholders.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || s.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Stakeholder Intelligence</h2>
        <p className="text-muted-foreground">
          Analysis of non-country stakeholders including IP offices, universities, and regional organizations
        </p>
      </div>

      {/* Type Selector */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedType === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType("all")}
        >
          All Types
        </Button>
        {stakeholderTypes.map(type => (
          <Button
            key={type.id}
            variant={selectedType === type.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(type.id)}
            className="gap-2"
          >
            <type.icon className="h-4 w-4" />
            {type.label}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stakeholders by name or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {!selectedStakeholder ? (
        /* Stakeholder List */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStakeholders.map(stakeholder => (
            <Card 
              key={stakeholder.id}
              className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all"
              onClick={() => setSelectedStakeholder(stakeholder)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold">{stakeholder.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{stakeholder.country}</p>
                  </div>
                  <Badge 
                    variant={
                      stakeholder.engagementLevel === "High" ? "default" :
                      stakeholder.engagementLevel === "Medium" ? "secondary" : "outline"
                    }
                  >
                    {stakeholder.engagementLevel}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Last contact: {stakeholder.lastContact}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Stakeholder Detail View */
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{stakeholderDetail.name}</h3>
              <p className="text-muted-foreground">{stakeholderDetail.country} • {stakeholderDetail.type}</p>
            </div>
            <Button variant="outline" onClick={() => setSelectedStakeholder(null)}>
              Back to all stakeholders
            </Button>
          </div>

          {/* AI Insights Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2">
                  <History className="h-4 w-4" />
                  Engagement history summary
                </Button>
                <Button variant="outline" className="gap-2">
                  <Target className="h-4 w-4" />
                  Identify recurring needs
                </Button>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Assess readiness level
                </Button>
                <Button variant="outline" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Gaps and opportunities
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Readiness Badge */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Readiness Level</p>
                  <p className="text-lg font-semibold">{stakeholderDetail.readiness}</p>
                </div>
                <Badge variant="default" className="text-lg px-4 py-1">
                  {stakeholderDetail.readiness}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">Engagement History</TabsTrigger>
              <TabsTrigger value="needs">Needs</TabsTrigger>
              <TabsTrigger value="gaps">Gaps</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {stakeholderDetail.engagementHistory.map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <Badge variant="outline" className="whitespace-nowrap">{item.date}</Badge>
                        <span>{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="needs" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {stakeholderDetail.needs.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 bg-primary/10 text-primary border-primary/30">•</Badge>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gaps" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {stakeholderDetail.gaps.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 bg-warning/10 text-warning border-warning/30">!</Badge>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="opportunities" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {stakeholderDetail.opportunities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 bg-success/10 text-success border-success/30">✓</Badge>
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

export default StakeholderIntelligence;
