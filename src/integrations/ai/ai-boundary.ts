export type AiContextPayload = {
  userId: string;
  houseId?: string;
  feature: string;
};

export interface AiMemoryBoundary {
  remember(input: AiContextPayload): Promise<void>;
}

export interface AiSuggestionBoundary {
  suggest(input: AiContextPayload): Promise<string[]>;
}

