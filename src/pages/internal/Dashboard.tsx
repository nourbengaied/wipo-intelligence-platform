import { Link } from "react-router-dom";
import {
  Library,
  MapPin,
  Users,
  TrendingUp,
  FolderKanban,
  FileText,
  Lightbulb,
  FileSearch,
  Globe,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const modules = [
  {
    title: "Knowledge Library",
    description: "Search and analyze all IES documents",
    icon: Library,
    href: "/internal/knowledge-library",
    color: "text-primary",
    bgColor: "bg-primary/10",
    stats: "1,247 documents",
  },
  {
    title: "Country Intelligence",
    description: "Country-level analysis and insights",
    icon: MapPin,
    href: "/internal/country-intelligence",
    color: "text-accent",
    bgColor: "bg-accent/10",
    stats: "193 countries",
  },
  {
    title: "Stakeholder Intelligence",
    description: "Non-country stakeholder analysis",
    icon: Users,
    href: "/internal/stakeholder-intelligence",
    color: "text-info",
    bgColor: "bg-info/10",
    stats: "856 stakeholders",
  },
  {
    title: "Trends & Insights",
    description: "Cross-cutting trend analysis",
    icon: TrendingUp,
    href: "/internal/trends-insights",
    color: "text-success",
    bgColor: "bg-success/10",
    stats: "42 active trends",
  },
  {
    title: "Projects & Operations",
    description: "Mission workflows and planning",
    icon: FolderKanban,
    href: "/internal/projects-operations",
    color: "text-warning",
    bgColor: "bg-warning/10",
    stats: "18 active projects",
  },
  {
    title: "IP Policies Module",
    description: "AI-guided policy development",
    icon: FileText,
    href: "/internal/ip-policies",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    stats: "15 templates",
  },
];

const recentActivity = [
  { type: "report", title: "Kenya Mission Report Q4 2025", date: "2 hours ago", country: "Kenya" },
  { type: "briefing", title: "ARIPO Regional Briefing", date: "Yesterday", country: "Regional" },
  { type: "event", title: "IP Awareness Workshop - Brazil", date: "2 days ago", country: "Brazil" },
  { type: "policy", title: "University of Nairobi IP Policy Review", date: "3 days ago", country: "Kenya" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          <p className="text-muted-foreground">
            Access your analytical workspace and AI-assisted tools
          </p>
        </div>
        <Link to="/internal/use-cases">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20">
            <CardContent className="flex items-center gap-3 py-3 px-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Explore Use Cases</p>
                <p className="text-xs text-muted-foreground">6 sample scenarios</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <FileSearch className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">87</p>
                <p className="text-sm text-muted-foreground">Countries Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-info" />
              <div>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-muted-foreground">Stakeholders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Events This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Modules Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Modules</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <Link key={module.title} to={module.href}>
              <Card className="h-full hover:shadow-md transition-all hover:border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${module.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <module.icon className={`h-6 w-6 ${module.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground">{module.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{module.stats}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <Card>
          <CardContent className="divide-y divide-border pt-2">
            {recentActivity.map((activity, index) => (
              <div key={index} className="py-3 flex items-center gap-4">
                <Badge variant="secondary" className="text-xs capitalize">
                  {activity.type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.country}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
