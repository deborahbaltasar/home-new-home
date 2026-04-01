export type EntitlementKey = "premium-roadmap" | "advanced-collaboration" | "future-ai";

export interface PaymentsBoundary {
  hasEntitlement(userId: string, entitlement: EntitlementKey): Promise<boolean>;
}

