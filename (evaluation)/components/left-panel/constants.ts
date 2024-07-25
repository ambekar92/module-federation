import { NavItem } from "../../types/types";


export const getStaticNavItems = (application_id: string): NavItem[] =>  [
    {
      section: "Firm Summary",
      child: [{section: "Firm Summary", url: `${application_id}/firm-summary`, title: "Firm Summary"}]
    },
    {
      section: "Documents",
      child: [{section: "Documents", url: `${application_id}/documents`, title: "Documents"}]
    },
    {
      section: "Analysis",
      child: [{section: "Analysis", url: `${application_id}/analysis`, title: "Analysis"}]
    },
    {
      section: "Notes",
      child: [{section: "Notes", url: `${application_id}/notes`, title: "Notes"}]
    },
    {
      section: "Messages",
      child: [{section: "Messages", url: `${application_id}/messages`, title: "Messages"}]
    },
    {
      section: "Audit",
      child: [{section: "Audit", url: `${application_id}/audit`, title: "Audit"}]
    },
    {
      section: "Task Timers",
      child: [{section: "Task Timers", url: `${application_id}/task-timers`, title: "Task Timers"}]
    }
  ]
