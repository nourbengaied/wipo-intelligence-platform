import { useState } from "react";
import { Search, Filter, FileText, Download, MessageSquare, X, Calendar, MapPin, Building, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Mock document data
const documents = [
  {
    id: 1,
    title: "Kenya Country Mission Report Q4 2025",
    type: "Mission Report",
    country: "Kenya",
    region: "Africa",
    stakeholders: ["Kenya Industrial Property Institute", "University of Nairobi"],
    unit: "IES-Africa",
    date: "2025-12-15",
    confidentiality: "Internal",
    tags: ["IP Office", "Capacity Building", "SMEs"],
  },
  {
    id: 2,
    title: "Brazil Country Briefing 2025",
    type: "Country Briefing",
    country: "Brazil",
    region: "Latin America",
    stakeholders: ["INPI Brazil", "Ministry of Science"],
    unit: "IES-LAC",
    date: "2025-11-20",
    confidentiality: "Internal",
    tags: ["Innovation Policy", "Technology Transfer"],
  },
  {
    id: 3,
    title: "ARIPO Regional Organization Briefing",
    type: "Stakeholder Briefing",
    country: null,
    region: "Africa",
    stakeholders: ["ARIPO"],
    unit: "IES-Africa",
    date: "2025-10-05",
    confidentiality: "Confidential",
    tags: ["Regional Organization", "Harmonization"],
  },
  {
    id: 4,
    title: "IES Quarterly Achievement Report Q3 2025",
    type: "Quarterly Report",
    country: null,
    region: "Global",
    stakeholders: [],
    unit: "IES-Management",
    date: "2025-10-01",
    confidentiality: "Internal",
    tags: ["Achievements", "Metrics", "Progress"],
  },
  {
    id: 5,
    title: "Indonesia Stakeholder Mission Report",
    type: "Mission Report",
    country: "Indonesia",
    region: "Asia Pacific",
    stakeholders: ["DGIP Indonesia", "IPB University"],
    unit: "IES-Asia",
    date: "2025-09-18",
    confidentiality: "Internal",
    tags: ["IP Office", "Academia", "Technology Transfer"],
  },
  {
    id: 6,
    title: "IP Awareness Workshop Report - Ghana",
    type: "Event Report",
    country: "Ghana",
    region: "Africa",
    stakeholders: ["Ghana Registrar General", "Kwame Nkrumah University"],
    unit: "IES-Africa",
    date: "2025-08-25",
    confidentiality: "Public",
    tags: ["Workshop", "IP Awareness", "Academia"],
  },
];

const documentTypes = ["All Types", "Mission Report", "Country Briefing", "Stakeholder Briefing", "Quarterly Report", "Event Report"];
const regions = ["All Regions", "Africa", "Asia Pacific", "Latin America", "Europe", "Arab", "Global"];
const years = ["All Years", "2025", "2024", "2023", "2022"];
const confidentialityLevels = ["All Levels", "Public", "Internal", "Confidential"];

const KnowledgeLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedConfidentiality, setSelectedConfidentiality] = useState("All Levels");
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === "All Types" || doc.type === selectedType;
    const matchesRegion = selectedRegion === "All Regions" || doc.region === selectedRegion;
    const matchesYear = selectedYear === "All Years" || doc.date.startsWith(selectedYear);
    const matchesConfidentiality = selectedConfidentiality === "All Levels" || doc.confidentiality === selectedConfidentiality;
    return matchesSearch && matchesType && matchesRegion && matchesYear && matchesConfidentiality;
  });

  const toggleDocument = (id: number) => {
    setSelectedDocuments(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedDocuments([]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Knowledge Library</h2>
        <p className="text-muted-foreground">
          Unified repository of all IES documents with AI-powered search and analysis
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents, tags, stakeholders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Documents</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Document Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confidentiality</label>
                  <Select value={selectedConfidentiality} onValueChange={setSelectedConfidentiality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {confidentialityLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2">
          {selectedType !== "All Types" && (
            <Badge variant="secondary" className="gap-1">
              {selectedType}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedType("All Types")} />
            </Badge>
          )}
          {selectedRegion !== "All Regions" && (
            <Badge variant="secondary" className="gap-1">
              {selectedRegion}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRegion("All Regions")} />
            </Badge>
          )}
          {selectedYear !== "All Years" && (
            <Badge variant="secondary" className="gap-1">
              {selectedYear}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedYear("All Years")} />
            </Badge>
          )}
        </div>
      </div>

      {/* Selection Action Bar */}
      {selectedDocuments.length > 0 && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="default">{selectedDocuments.length} selected</Badge>
                <Button variant="ghost" size="sm" onClick={clearSelection}>
                  Clear selection
                </Button>
              </div>
              <Button className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Ask AI about selected documents
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Showing {filteredDocuments.length} of {documents.length} documents
        </p>
        
        {filteredDocuments.map((doc) => (
          <Card 
            key={doc.id} 
            className={`hover:shadow-md transition-all cursor-pointer ${
              selectedDocuments.includes(doc.id) ? "border-primary bg-primary/5" : ""
            }`}
          >
            <CardContent className="py-4">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedDocuments.includes(doc.id)}
                  onCheckedChange={() => toggleDocument(doc.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{doc.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{doc.type}</Badge>
                        {doc.country && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {doc.country}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {doc.unit}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {doc.date}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge 
                      variant={doc.confidentiality === "Public" ? "outline" : doc.confidentiality === "Confidential" ? "destructive" : "secondary"}
                    >
                      {doc.confidentiality}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeLibrary;
