/* eslint-disable @next/next/no-img-element */

import ReactMarkdown from "react-markdown";
import { ExternalLink } from "lucide-react";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children, ...props }) => (
          <h1
            className="group relative mb-8 mt-12 text-4xl font-bold tracking-tight text-foreground first:mt-0 sm:text-5xl"
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            className="group relative mb-6 mt-12 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            className="group relative mb-4 mt-8 text-xl font-semibold text-foreground sm:text-2xl"
            {...props}
          >
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p
            className="mb-2 leading-7 text-foreground [&:not(:first-child)]:mt-4"
            {...props}
          >
            {children}
          </p>
        ),
        a: ({ href, children, ...props }) => (
          <a
            href={href}
            className="inline-flex items-center gap-1 font-medium text-blue-600 no-underline transition-colors hover:text-blue-500 hover:underline"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            {...props}
          >
            {children}
            {href?.startsWith("http") && <ExternalLink className="h-3 w-3" />}
          </a>
        ),
        ul: ({ children, ...props }) => (
          <ul
            className="mb-6 ml-6 list-disc space-y-2 text-slate-700 [&>li]:mt-2"
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            className="mb-6 ml-6 list-decimal space-y-2 text-slate-700 [&>li]:mt-2"
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="leading-7 marker:text-slate-400" {...props}>
            {children}
          </li>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="my-8 border-l-4 border-blue-200 bg-blue-50 py-4 pl-6 pr-4 italic text-slate-700"
            {...props}
          >
            {children}
          </blockquote>
        ),

        img: ({ src, alt, ...props }) => (
          <figure className="my-8">
            <img
              src={src ?? "/placeholder.svg"}
              alt={alt ?? ""}
              className="mx-auto rounded-lg shadow-lg"
              loading="lazy"
              {...props}
            />
            {alt && (
              <figcaption className="mt-3 text-center text-sm text-slate-600">
                {alt}
              </figcaption>
            )}
          </figure>
        ),
        hr: ({ ...props }) => (
          <hr className="my-12 border-slate-200" {...props} />
        ),
        strong: ({ children, ...props }) => (
          <strong className="font-semibold text-slate-900" {...props}>
            {children}
          </strong>
        ),
        em: ({ children, ...props }) => (
          <em className="italic text-slate-600" {...props}>
            {children}
          </em>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
