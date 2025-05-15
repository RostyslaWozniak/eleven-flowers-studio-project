"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { signInSchema, type SignInSchema } from "../schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/auth/actions/sign-in-action";
import { PasswordInput } from "./password-input";
import LoadingButton from "@/components/loading-button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInSchema) {
    setError(null);
    startTransition(async () => {
      const res = await signIn(data);
      if (res?.error) {
        setError(res.error);
        return;
      }
      router.push("/dashboard/products");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username{" "}
                {form.formState.errors.username && (
                  <p className="text-xs text-destructive">
                    ( {form.formState.errors.username.message} )
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username or email"
                  type="text"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password{" "}
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    ( {form.formState.errors.password.message} )
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {error && <div className="text-sm text-destructive">{error}</div>}
        <LoadingButton loading={isPending} type="submit" className="w-full">
          Sign In
        </LoadingButton>
      </form>
    </Form>
  );
}
