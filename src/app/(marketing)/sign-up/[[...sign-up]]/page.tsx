import { SignUp } from "@clerk/nextjs";

import { SectionShell } from "@/design-system/patterns/section-shell";
import { env } from "@/shared/config/env";

export default function SignUpPage() {
  return (
    <SectionShell className="flex flex-1 items-center justify-center py-10">
      <div className="flex justify-center md:-translate-y-6">
        <SignUp
          path={env.clerkSignUpUrl}
          routing="path"
          signInUrl={env.clerkSignInUrl}
          fallbackRedirectUrl={env.clerkSignUpFallbackRedirectUrl}
          signInFallbackRedirectUrl={env.clerkSignInFallbackRedirectUrl}
        />
      </div>
    </SectionShell>
  );
}
