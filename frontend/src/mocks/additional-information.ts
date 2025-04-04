import { IAdditionalInformation } from "@/types/interfaces";

export const additionalInformationMock: IAdditionalInformation[] = [
  {
    id: "aim-1",
    author: "City Hall",
    title:
      "Local Flood Warnings Issued for Low-Lying Areas Along the River Thames",
    content:
      "The Environment Agency has issued flood warnings for properties adjacent to the River Thames in the Oxford area following persistent heavy rainfall. Residents in Osney Mead, Grandpont, and Abingdon Road are advised to take precautionary measures and monitor local authority updates.",
    link: "/local-flood-updates",
  },
  {
    id: "aim-2",
    author: "Local Police",
    title: "Important Travel Disruption Notice: A44 Closure Near Woodstock",
    content:
      "Due to a significant landslip following recent heavy rains, the A44 northbound is currently closed between Peartree Roundabout and Woodstock. Motorists are advised to seek alternative routes and allow extra journey time. Updates will be provided regularly.",
    link: "/traffic-updates",
  },
  {
    id: "aim-3",
    author: "XX Newspaper",
    title: "Power Outages Reported in Several North Oxford Postcodes",
    content:
      "Scottish and Southern Electricity Networks (SSEN) are reporting unplanned power outages affecting OX2 and OX3 postcodes. Engineers are working to restore power as quickly as possible. Residents are advised to check the SSEN website for live updates and safety advice.",
    link: "https://www.ssen.co.uk/PowerCuts/",
  },
];
