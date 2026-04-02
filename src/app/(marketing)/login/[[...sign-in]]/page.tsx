import { SignIn } from "@clerk/nextjs";

import { SectionShell } from "@/design-system/patterns/section-shell";
import { env } from "@/shared/config/env";

export default function LoginPage() {
  return (
    <SectionShell className="flex flex-1 items-center justify-center py-10">
      <div className="flex justify-center md:-translate-y-6">
        <SignIn
          path={env.clerkSignInUrl}
          routing="path"
          signUpUrl={env.clerkSignUpUrl}
          fallbackRedirectUrl={env.clerkSignInFallbackRedirectUrl}
          signUpFallbackRedirectUrl={env.clerkSignUpFallbackRedirectUrl}
        />
      </div>
    </SectionShell>
  );
}
