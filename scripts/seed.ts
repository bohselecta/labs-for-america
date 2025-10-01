import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create organization
  const org = await prisma.org.upsert({
    where: { slug: "city" },
    update: {},
    create: {
      slug: "city",
      name: "City of Example",
      logoUrl: "/logo.png",
      primaryHex: "#2563EB"
    }
  });

  // Create comprehensive demo labs
  const labs = [
    // Labs.gov Federal Labs
    {
      title: "AI-Powered Wildfire Detection",
      slug: "ai-wildfire-detection",
      category: "Federal",
      prize: 100000,
      deadline: new Date("2026-03-15"),
      status: "open",
      summary: "Develop AI models to detect wildfires from satellite imagery in real-time, improving response times and saving lives.",
      bodyMd: `# AI-Powered Wildfire Detection Challenge

The Department of Interior needs advanced AI models to detect wildfires from satellite imagery in real-time.

## Challenge Goals

- Detect wildfires within 15 minutes of ignition
- Reduce false positives by 90%
- Work across diverse terrain and weather conditions
- Integrate with existing emergency response systems

## Technical Requirements

- Process satellite imagery at scale
- Handle various weather conditions
- Provide confidence scores for detections
- API integration capabilities

## Evaluation Criteria

- Detection accuracy and speed
- False positive reduction
- Scalability and performance
- Integration feasibility

**Prize**: $100,000 total prize pool
**Deadline**: March 15, 2026`,
      heroUrl: "/images/wildfire-detection.svg",
      isBeginner: false
    },
    {
      title: "Sustainable Aviation Fuels",
      slug: "sustainable-aviation-fuels",
      category: "Federal",
      prize: 50000,
      deadline: new Date("2026-05-20"),
      status: "open",
      summary: "Design sustainable aviation fuel production processes that reduce carbon emissions by 80% compared to conventional jet fuel.",
      bodyMd: `# Sustainable Aviation Fuels Innovation

The Department of Energy seeks breakthrough technologies for sustainable aviation fuel production.

## Objectives

- Reduce lifecycle carbon emissions by 80%
- Achieve cost parity with conventional fuels
- Scale to commercial production levels
- Meet aviation safety standards

## Focus Areas

- Feedstock optimization
- Conversion process efficiency
- Supply chain sustainability
- Economic viability

## Evaluation Metrics

- Carbon reduction percentage
- Cost competitiveness
- Scalability potential
- Safety compliance

**Prize**: $50,000
**Deadline**: May 20, 2026`,
      heroUrl: "/images/aviation-fuel.svg",
      isBeginner: false
    },
    {
      title: "Telehealth for Rural Communities",
      slug: "telehealth-rural",
      category: "Federal",
      prize: 75000,
      deadline: new Date("2026-04-10"),
      status: "open",
      summary: "Create telehealth solutions that bring quality healthcare to underserved rural communities with limited internet connectivity.",
      bodyMd: `# Telehealth for Rural Communities

The Department of Health and Human Services needs innovative telehealth solutions for rural areas.

## Challenge Requirements

- Work with limited bandwidth (under 1 Mbps)
- Support multiple medical specialties
- Ensure patient privacy and security
- Provide offline capabilities

## Technical Specifications

- Low-bandwidth optimization
- Offline data synchronization
- HIPAA compliance
- Cross-platform compatibility

## Success Metrics

- Patient satisfaction scores
- Healthcare access improvement
- Cost reduction
- Technology adoption rates

**Prize**: $75,000
**Deadline**: April 10, 2026`,
      heroUrl: "/images/telehealth.svg",
      isBeginner: true
    },
    {
      title: "Flood Prediction & Response",
      slug: "flood-prediction-response",
      category: "Federal",
      prize: 60000,
      deadline: new Date("2026-06-30"),
      status: "upcoming",
      summary: "Develop AI models to predict flooding 48 hours in advance and optimize emergency response resource allocation.",
      bodyMd: `# Flood Prediction & Response System

FEMA needs advanced flood prediction and response optimization systems.

## Key Requirements

- Predict flooding 48 hours in advance
- Accuracy within 100m resolution
- Optimize evacuation routes
- Resource allocation algorithms

## Data Sources

- Weather station networks
- Satellite imagery
- River gauge data
- Historical flood records

## Performance Targets

- 90% prediction accuracy
- Sub-hourly updates
- Real-time response optimization
- Integration with emergency systems

**Prize**: $60,000
**Deadline**: June 30, 2026`,
      heroUrl: "/images/flood-prediction.svg",
      isBeginner: false
    },
    {
      title: "Cybersecurity for Critical Infrastructure",
      slug: "cybersecurity-infrastructure",
      category: "Federal",
      prize: 80000,
      deadline: new Date("2026-07-15"),
      status: "upcoming",
      summary: "Design cybersecurity frameworks to protect critical infrastructure from sophisticated cyber attacks.",
      bodyMd: `# Cybersecurity for Critical Infrastructure

The Department of Homeland Security seeks advanced cybersecurity solutions for critical infrastructure protection.

## Protection Targets

- Power grid systems
- Water treatment facilities
- Transportation networks
- Communication systems

## Threat Landscape

- Nation-state actors
- Ransomware attacks
- Supply chain compromises
- Insider threats

## Solution Requirements

- Real-time threat detection
- Automated response capabilities
- Zero-trust architecture
- Compliance with NIST frameworks

**Prize**: $80,000
**Deadline**: July 15, 2026`,
      heroUrl: "/images/cybersecurity.svg",
      isBeginner: false
    },
    {
      title: "Space Materials Innovation",
      slug: "space-materials-innovation",
      category: "Federal",
      prize: 120000,
      deadline: new Date("2026-08-20"),
      status: "upcoming",
      summary: "Develop lightweight, radiation-resistant materials for deep space missions and Mars colonization.",
      bodyMd: `# Space Materials Innovation Challenge

NASA seeks breakthrough materials for deep space exploration and Mars missions.

## Material Requirements

- Radiation resistance (100x Earth levels)
- Extreme temperature tolerance (-200°C to +200°C)
- Lightweight construction
- Self-healing capabilities

## Applications

- Spacecraft hulls
- Habitat construction
- Spacesuit materials
- Equipment protection

## Testing Standards

- Vacuum chamber testing
- Radiation exposure tests
- Temperature cycling
- Structural integrity validation

**Prize**: $120,000
**Deadline**: August 20, 2026`,
      heroUrl: "/images/space-materials.svg",
      isBeginner: false
    },
    {
      title: "Accessible Educational Technology",
      slug: "accessible-edtech",
      category: "Federal",
      prize: 40000,
      deadline: new Date("2026-05-05"),
      status: "open",
      summary: "Create educational technology solutions that are fully accessible to students with disabilities.",
      bodyMd: `# Accessible Educational Technology

The Department of Education needs inclusive educational technology solutions.

## Accessibility Requirements

- Screen reader compatibility
- Keyboard navigation
- High contrast modes
- Multiple language support

## Target Disabilities

- Visual impairments
- Hearing impairments
- Motor disabilities
- Cognitive differences

## Platform Support

- Web applications
- Mobile apps
- Desktop software
- Learning management systems

## Evaluation Criteria

- WCAG 2.1 AA compliance
- User experience quality
- Educational effectiveness
- Implementation feasibility

**Prize**: $40,000
**Deadline**: May 5, 2026`,
      heroUrl: "/images/accessible-edtech.svg",
      isBeginner: true
    },
    // CivicLabs Examples
    {
      title: "Lake Cleanup Concepts",
      slug: "lake-cleanup-concepts",
      category: "Civic",
      prize: 5000,
      deadline: new Date("2026-04-30"),
      status: "open",
      summary: "Help us design innovative solutions for cleaning up our local lake and preventing future pollution.",
      bodyMd: `# Lake Cleanup Challenge

Our beautiful Lake Serenity has been facing increasing pollution challenges. We need your help to design innovative solutions that can:

- Remove existing pollutants safely
- Prevent future contamination
- Engage the community in ongoing stewardship
- Work within our budget constraints

## What We're Looking For

- Technical solutions for water treatment
- Community engagement strategies
- Educational programs
- Monitoring and maintenance systems

## Evaluation Criteria

- Feasibility and cost-effectiveness
- Environmental impact
- Community involvement potential
- Long-term sustainability

Submit your proposals by April 30th, 2026.`,
      heroUrl: "/images/lake-cleanup.svg",
      isBeginner: true
    },
    {
      title: "Safer Crosswalks",
      slug: "safer-crosswalks",
      category: "Civic",
      prize: 2000,
      deadline: new Date("2026-06-01"),
      status: "upcoming",
      summary: "Design safer pedestrian crossings for our Vision Zero initiative. Help us eliminate traffic fatalities.",
      bodyMd: `# Vision Zero: Safer Crosswalks

As part of our Vision Zero initiative, we're seeking innovative designs for safer pedestrian crossings throughout the city.

## Current Challenges

- High-traffic intersections with poor visibility
- Elderly and disabled accessibility needs
- School zone safety concerns
- Night-time visibility issues

## Design Requirements

- ADA compliance
- Cost-effective implementation
- Minimal traffic disruption during installation
- Easy maintenance

## Evaluation Criteria

- Safety improvement potential
- Accessibility features
- Cost and feasibility
- Community impact

Submit your designs by June 1st, 2026.`,
      heroUrl: "/images/safer-crosswalks.svg",
      isBeginner: true
    },
    {
      title: "Smart Park Lighting",
      slug: "smart-park-lighting",
      category: "Civic",
      prize: 3000,
      deadline: new Date("2026-07-10"),
      status: "upcoming",
      summary: "Design intelligent lighting systems for city parks that improve safety while reducing energy consumption.",
      bodyMd: `# Smart Park Lighting Initiative

Our city parks need intelligent lighting solutions that balance safety, energy efficiency, and environmental impact.

## Design Goals

- Improve nighttime safety
- Reduce energy consumption by 50%
- Minimize light pollution
- Enhance user experience

## Technical Requirements

- Motion-activated lighting
- Solar power integration
- Remote monitoring capabilities
- Weather-resistant design

## Success Metrics

- Crime reduction statistics
- Energy savings measurement
- Community satisfaction
- Maintenance cost reduction

**Prize**: $3,000
**Deadline**: July 10, 2026`,
      heroUrl: "/images/smart-lighting.svg",
      isBeginner: true
    },
    // JusticeLabs Examples
    {
      title: "Unidentified Person 2009-A",
      slug: "unidentified-person-2009-a",
      category: "Justice",
      prize: 0,
      deadline: new Date("2026-12-31"),
      status: "open",
      summary: "Help us identify this person found in 2009. Any information could help bring closure to families.",
      bodyMd: `# Cold Case: Unidentified Person 2009-A

On March 15, 2009, an unidentified person was found in Riverside Park. Despite extensive investigation, we have been unable to identify this individual.

## What We Know

- Found March 15, 2009 in Riverside Park
- Estimated age: 25-35 years old
- Height: 5'8" - 5'10"
- Distinctive tattoo on left forearm

## How You Can Help

- Review the case files and photos
- Share any information you might have
- Help us reach communities who might recognize this person
- Suggest new investigative approaches

## Important Notes

- All information is treated confidentially
- This is an active investigation
- Please do not interfere with ongoing police work
- Contact us through official channels only

Any information, no matter how small, could be crucial to solving this case.`,
      heroUrl: "/images/cold-case.svg",
      isBeginner: false
    },
    {
      title: "Missing Person: Sarah Chen",
      slug: "missing-person-sarah-chen",
      category: "Justice",
      prize: 0,
      deadline: new Date("2026-12-31"),
      status: "open",
      summary: "Help us locate Sarah Chen, last seen on March 8, 2024. Any information about her whereabouts is crucial.",
      bodyMd: `# Missing Person: Sarah Chen

Sarah Chen, 28, was last seen on March 8, 2024, leaving her apartment building at 7:30 PM.

## Physical Description

- Age: 28 years old
- Height: 5'4"
- Weight: 120 lbs
- Hair: Black, shoulder-length
- Eyes: Brown
- Last seen wearing: Blue jeans, white sweater, black backpack

## Last Known Location

- Apartment building: 123 Oak Street
- Time: 7:30 PM, March 8, 2024
- Destination: Unknown

## How You Can Help

- Share this information on social media
- Check surveillance footage if you own cameras
- Report any sightings immediately
- Contact us with any relevant information

## Contact Information

- Emergency: 911
- Tip Line: (555) 123-TIPS
- Email: tips@citypd.gov

**Reward**: Recognition and gratitude for helping bring Sarah home safely.`,
      heroUrl: "/images/missing-person.svg",
      isBeginner: false
    }
  ];

  for (const labData of labs) {
    await prisma.lab.upsert({
      where: { slug: labData.slug },
      update: {},
      create: {
        ...labData,
        orgId: org.id
      }
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
