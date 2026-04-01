export type AuthUser = {
  id: string;
  email?: string;
  fullName?: string;
};

export interface AuthProviderBoundary {
  getCurrentUser(): Promise<AuthUser | null>;
}

