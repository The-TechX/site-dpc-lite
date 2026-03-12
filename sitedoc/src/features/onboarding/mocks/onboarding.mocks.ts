import type { OnboardingStep } from "@/src/features/onboarding/types/onboarding.types";
export const onboardingSteps: OnboardingStep[] = [
  { title: "Create site record", description: "Initialize Site Info and tenant contacts.", owner: "PM/PC" },
  { title: "Complete technical setup", description: "Fill services, phone numbers, and rack plans.", owner: "FE" },
  { title: "Run closeout", description: "Audit and generate report package.", owner: "CSC" },
];
