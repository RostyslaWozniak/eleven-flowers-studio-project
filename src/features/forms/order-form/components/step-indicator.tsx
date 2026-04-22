"use client";

import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleAnimation } from "@/components/animations/toogle-comp-animation";

type StepIndicatorProps = {
  currentStep: number;
  steps: string[];
};

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="mb-4 w-full">
      <div className="flex items-center justify-between md:gap-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={cn("flex items-center md:gap-4", {
              "flex-1": index !== steps.length - 1,
            })}
          >
            <div className="flex flex-1 flex-col items-center">
              <div
                className={cn(
                  "relative flex aspect-square h-8 items-center justify-center rounded-full text-sm font-semibold transition-all md:h-10",
                  index < currentStep
                    ? "bg-primary text-white"
                    : index === currentStep
                      ? "bg-primary text-white delay-300 duration-500"
                      : "bg-gray-200 text-gray-500",
                )}
              >
                <ToggleAnimation
                  className="absolute inset-0 flex items-center justify-center"
                  firstComp={<>{index + 1}</>}
                  secondComp={<CheckIcon className="h-5 w-5 md:h-6 md:w-6" />}
                  isActive={index < currentStep}
                />
              </div>
              <p className="mt-2 text-nowrap text-center text-xs font-medium text-muted-foreground">
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="relative h-0.5 w-full overflow-hidden rounded-full md:h-1">
                <div className="absolute inset-0 flex-1 bg-gray-200 transition-colors" />
                <div
                  className={cn(
                    "absolute inset-0 h-full bg-primary transition-all duration-500",
                    index < currentStep ? "max-w-full" : "max-w-0",
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
