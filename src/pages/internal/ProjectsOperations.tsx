import { useState } from "react";
import { Plus, Folder, Calendar, MapPin, Users, Lightbulb, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const projects = [
  {
    id: 1,
    title: "Kenya IP Office Modernization",
    type: "Mission",
    country: "Kenya",
    status: "In Progress",
    dueDate: "Jan 2026",
    progress: 65,
  },
  {
    id: 2,
    title: "ARIPO Regional Training Program",
    type: "Training",
    country: "Regional",
    status: "Planning",
    dueDate: "Mar 2026",
    progress: 20,
  },
  {
    id: 3,
    title: "Brazil University IP Policy Review",
    type: "Policy Development",
    country: "Brazil",
    status: "In Progress",
    dueDate: "Feb 2026",
    progress: 45,
  },
  {
    id: 4,
    title: "Indonesia SME IP Clinic Launch",
    type: "Mission",
    country: "Indonesia",
    status: "Completed",
    dueDate: "Dec 2025",
    progress: 100,
  },
];

const aiSuggestions = {
  relatedReports: [
    "Kenya Mission Report Q3 2025",
    "Kenya Country Briefing 2025",
    "KIPI Annual Assessment 2024",
  ],
  comparableCountries: ["Ghana", "Tanzania", "Uganda"],
  existingInterventions: [
    "IP Office automation in Ghana (2024)",
    "Training program in Tanzania (2023)",
  ],
  commonRisks: [
    "Resource availability during mission",
    "Stakeholder scheduling conflicts",
    "Technical infrastructure limitations",
  ],
  bestPractices: [
    "Early stakeholder engagement",
    "Phased implementation approach",
    "Local champion identification",
  ],
};

const ProjectsOperations = () => {
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success/10 text-success border-success/30";
      case "In Progress": return "bg-primary/10 text-primary border-primary/30";
      case "Planning": return "bg-warning/10 text-warning border-warning/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "In Progress": return <Clock className="h-4 w-4 text-primary" />;
      case "Planning": return <Calendar className="h-4 w-4 text-warning" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects & Operations</h2>
          <p className="text-muted-foreground">
            Mission workflows, planning, and AI-assisted project preparation
          </p>
        </div>
        <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Start New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input placeholder="Enter project title..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mission">Mission</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="policy">Policy Development</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Country/Region</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="brazil">Brazil</SelectItem>
                      <SelectItem value="indonesia">Indonesia</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Brief project description..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewProject(false)}>Cancel</Button>
                <Button onClick={() => setShowNewProject(false)}>Create Project</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold">Active Projects</h3>
          {projects.map(project => (
            <Card 
              key={project.id}
              className={`cursor-pointer hover:shadow-md transition-all ${
                selectedProject?.id === project.id ? "border-primary" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold">{project.title}</h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {project.country}
                      </span>
                      <Badge variant="outline">{project.type}</Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {project.dueDate}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1">{project.status}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Suggestions Panel */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            AI Suggestions
          </h3>
          
          {selectedProject ? (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Related Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {aiSuggestions.relatedReports.map((report, i) => (
                      <li key={i} className="text-muted-foreground hover:text-foreground cursor-pointer">
                        • {report}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Comparable Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {aiSuggestions.comparableCountries.map((country, i) => (
                      <Badge key={i} variant="secondary">{country}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Common Risks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {aiSuggestions.commonRisks.map((risk, i) => (
                      <li key={i} className="text-muted-foreground">• {risk}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {aiSuggestions.bestPractices.map((practice, i) => (
                      <li key={i} className="text-muted-foreground">• {practice}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select a project to see AI suggestions</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsOperations;
