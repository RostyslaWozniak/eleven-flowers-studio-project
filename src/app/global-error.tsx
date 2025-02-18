"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  children,
  reset,
}: {
  children: React.ReactNode;
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        {children}
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
