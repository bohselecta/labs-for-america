// Content guidelines for beginner-friendly civic engagement
export const CONTENT_GUIDELINES = {
  // Beginner-friendly language patterns
  language: {
    avoid: [
      "stakeholders", "leverage", "synergy", "paradigm", "utilize", 
      "facilitate", "implement", "deploy", "execute", "optimize"
    ],
    use: [
      "people", "use", "help", "make", "do", "run", "work", "build", "create"
    ],
    explanations: {
      "civic engagement": "how people get involved in their community",
      "collaboration": "working together with others",
      "innovation": "new ideas and creative solutions",
      "governance": "how decisions are made",
      "transparency": "being open and clear about what's happening"
    }
  },

  // Impact callouts for different user types
  impactCallouts: {
    beginner: {
      title: "Perfect for Getting Started",
      description: "No experience needed. Just share your ideas and help your community.",
      icon: "award",
      color: "green"
    },
    expert: {
      title: "Advanced Collaboration",
      description: "Deep technical discussions and expert-level contributions welcome.",
      icon: "innovation", 
      color: "blue"
    },
    community: {
      title: "Community Impact",
      description: "Your ideas help shape real decisions that affect everyone.",
      icon: "impact",
      color: "purple"
    },
    government: {
      title: "Official Recognition",
      description: "Contributions are documented and shared with decision makers.",
      icon: "democracy",
      color: "blue"
    }
  },

  // Helpful resources by context
  resources: {
    gettingStarted: [
      {
        title: "How to Submit Your First Idea",
        description: "Step-by-step guide for new contributors",
        type: "guide",
        url: "/docs/getting-started"
      },
      {
        title: "What Makes a Good Contribution",
        description: "Tips for writing clear, helpful submissions",
        type: "tips",
        url: "/docs/contribution-tips"
      }
    ],
    community: [
      {
        title: "Community Guidelines",
        description: "How we work together respectfully",
        type: "guidelines",
        url: "/docs/community-guidelines"
      },
      {
        title: "How Decisions Are Made",
        description: "Understanding the review and selection process",
        type: "process",
        url: "/docs/decision-process"
      }
    ],
    technical: [
      {
        title: "Technical Requirements",
        description: "What you need to know for technical challenges",
        type: "technical",
        url: "/docs/technical-requirements"
      },
      {
        title: "Data and Privacy",
        description: "How we protect your information",
        type: "privacy",
        url: "/docs/privacy"
      }
    ]
  },

  // Beginner-friendly explanations
  explanations: {
    whatIsLab: "A Lab is a community challenge where people work together to solve a problem. Anyone can participate by sharing ideas, voting on solutions, or helping refine proposals.",
    howToContribute: "Contributing is easy: read the challenge, think about solutions, and share your ideas. You can also vote on other people's contributions and add helpful comments.",
    whatHappensNext: "After you contribute, community members vote on ideas. The most popular and practical solutions get reviewed by experts and may be implemented by the organization.",
    whyParticipate: "Your ideas help solve real community problems. You'll learn about civic issues, meet like-minded people, and see your contributions make a difference."
  }
};

// Helper functions for content transformation
export function simplifyLanguage(text: string): string {
  let simplified = text;
  
  CONTENT_GUIDELINES.language.avoid.forEach(complex => {
    const simple = CONTENT_GUIDELINES.language.use[0]; // Use first simple word
    simplified = simplified.replace(new RegExp(complex, 'gi'), simple);
  });
  
  return simplified;
}

export function addExplanation(term: string): string {
  const explanation = CONTENT_GUIDELINES.language.explanations[term as keyof typeof CONTENT_GUIDELINES.language.explanations];
  return explanation ? `${term} (${explanation})` : term;
}

export function getImpactCallout(type: keyof typeof CONTENT_GUIDELINES.impactCallouts) {
  return CONTENT_GUIDELINES.impactCallouts[type];
}

export function getResources(context: keyof typeof CONTENT_GUIDELINES.resources) {
  return CONTENT_GUIDELINES.resources[context];
}
