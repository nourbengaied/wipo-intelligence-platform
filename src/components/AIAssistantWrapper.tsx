import { useLocation, useParams } from "react-router-dom";
import AIAssistant from "./AIAssistant";
import { nationalModelCountries, regionalModelRegions, countryReports } from "@/data/countryPolicyData";

// Helper to convert slug to title case
const slugToTitle = (slug: string): string => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const AIAssistantWrapper = () => {
  const location = useLocation();
  const params = useParams<{ country?: string }>();

  // Only show on external interface pages
  if (!location.pathname.startsWith("/external")) {
    return null;
  }

  // Determine page context
  let page: string | undefined;
  if (location.pathname.includes("/ip-policies/toolkit")) {
    page = "policy-toolkit";
  } else if (location.pathname.includes("/ip-policies/database")) {
    page = "policies-database";
  } else if (location.pathname.includes("/ip-policies/model")) {
    page = "policy-model";
  } else if (location.pathname.includes("/ip-policies")) {
    page = "ip-policies";
  } else if (location.pathname.includes("/ip-tools")) {
    page = "ip-tools";
  } else if (location.pathname.includes("/reports")) {
    page = "reports";
  } else if (location.pathname.includes("/benchbook")) {
    page = "benchbook";
  }

  // Get country context
  const country = params.country;
  const countryName = country ? slugToTitle(country) : undefined;

  // Gather page-specific data
  const pageData: any = {};

  if (country) {
    // Check for national model
    if (nationalModelCountries[country]) {
      pageData.hasNationalModel = true;
      pageData.availableLanguages = nationalModelCountries[country].languages;
    }

    // Check for regional model
    for (const [regionKey, region] of Object.entries(regionalModelRegions)) {
      if (region.countries.includes(country)) {
        pageData.hasRegionalModel = true;
        break;
      }
    }

    // Add reports if on reports page
    if (page === "reports" && countryReports[country]) {
      pageData.reports = countryReports[country].map((report: any) => ({
        title: report.title,
        year: report.year,
        category: report.category,
      }));
    }

    // Add tools info if on IP tools page
    if (page === "ip-tools") {
      pageData.tools = [
        {
          name: "IP Policy Models",
          description: pageData.hasNationalModel 
            ? `National model available for ${countryName}` 
            : pageData.hasRegionalModel 
            ? "Regional model available" 
            : "Access global IP policy templates"
        },
        {
          name: "Policy Toolkit",
          description: "AI-powered policy customization tool"
        },
        {
          name: "Policies Database",
          description: "Browse institutional IP policies worldwide"
        }
      ];
    }

    // Add policies info if on IP policies page
    if (page === "ip-policies") {
      pageData.policies = [];
      if (pageData.hasNationalModel) {
        pageData.policies.push({
          title: `${countryName} National IP Policy Model`,
          description: `Available in ${pageData.availableLanguages?.join(", ")}`
        });
      }
      if (pageData.hasRegionalModel) {
        pageData.policies.push({
          title: "Regional IP Policy Framework",
          description: "Access regional policy guidelines and templates"
        });
      }
      pageData.policies.push(
        {
          title: "IP Policy Template for Academic and Research Institutions",
          description: "Comprehensive template with 15 articles covering all aspects of IP policy"
        },
        {
          title: "AI-Powered Policy Toolkit",
          description: "Customize policy templates with AI assistance"
        },
        {
          title: "Institutional IP Policies Database",
          description: "Browse and search IP policies from institutions worldwide"
        }
      );
    }
  }

  return (
    <AIAssistant
      context={{
        page,
        country,
        countryName,
        pageData: Object.keys(pageData).length > 0 ? pageData : undefined,
      }}
    />
  );
};

export default AIAssistantWrapper;
