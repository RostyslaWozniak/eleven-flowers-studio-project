"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

import { useParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";
import { usePathname } from "@/i18n/routing";
import { NotFoundSection } from "@/app/_components/sections/not-found-section";

export function PagePagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();

  const params = useParams();

  const currentPage = params.page ? Number(params.page) : 1;

  const createPageURL = (pageNumber: number | string) => {
    return `${pathname.replace(`/${currentPage}`, ``)}/${pageNumber.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  if (totalPages < currentPage)
    return (
      <div className="w-full">
        <NotFoundSection />
      </div>
    );

  return (
    <div className="flex px-2.5">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border-b-2 border-white text-primary",
    {
      "z-10  border-b-primary font-bold": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-full border",
    {
      "pointer-events-none text-gray-300 opacity-50": isDisabled,
      "hover:bg-secondary": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    },
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4 text-primary" />
    ) : (
      <ArrowRightIcon className="w-4 text-primary" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
