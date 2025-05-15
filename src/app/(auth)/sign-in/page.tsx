import { FormContainer } from "@/auth/components/form-wrapper";
import { SignInForm } from "@/auth/components/sign-in-form";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ oauthError?: string }>;
}) {
  const { oauthError } = await searchParams;

  return (
    <div className="mt-12 flex justify-center">
      <FormContainer title="Sign in" error={oauthError}>
        <SignInForm />
      </FormContainer>
    </div>
  );
}
