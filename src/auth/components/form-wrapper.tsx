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
        <div>{children}</div>
      </div>
    </div>
  );
};
