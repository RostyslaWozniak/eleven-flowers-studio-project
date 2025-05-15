import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

type FormContainerProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  error?: string;
};

export const FormContainer = ({
  children,
  title,
  description,
  error,
}: FormContainerProps) => {
  return (
    <div className="flex w-full">
      <div className="mx-auto w-full max-w-[400px] space-y-10 overflow-y-auto px-5 md:py-10">
        <div className="space-y-3">
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-center text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          )}
          {error && (
            <p className="text-center text-sm text-destructive md:text-base">
              {error}
            </p>
          )}
        </div>
        <div>
          {children}
          <div className="my-6 flex items-center">
            <span className="h-px flex-1 bg-muted-foreground" />
            <span className="px-2 text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-muted-foreground" />
          </div>
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full italic text-primary hover:underline",
              )}
            >
              <HomeIcon className="mr-2 min-h-5 min-w-5" />
              Go to home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
