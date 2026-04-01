export const designGuidelines = {
  positioning: {
    tone: "premium, calm, practical, home-centered",
    avoid: [
      "generic productivity dashboards",
      "purple-led identity",
      "dense admin-like tables as a default experience"
    ]
  },
  typography: {
    displayUsage: "Use display font for hero statements, section headers, and anchor moments.",
    bodyUsage: "Use sans font for interface copy, lists, filters, forms, and supporting text."
  },
  spacing: {
    rule: "Prefer generous vertical spacing and clean grouping before adding separators.",
    mobileFirst: "Start with compact one-column composition, then expand into panels on larger screens."
  },
  motion: {
    rule: "Use motion to guide attention during reveal and context changes, not for decoration overload.",
    defaults: ["fadeUp", "staggerFast"]
  }
} as const;
