import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { buttonVariants } from "./ui/button";
import { type VariantProps } from "class-variance-authority";

type DialogProps = {
  children?: React.ReactNode;
  closeButton?: string;
  closeButtonVariant?: VariantProps<typeof buttonVariants>;
  className?: string;
  description: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

export const DialogWrapper = ({
  children,
  closeButton,
  closeButtonVariant = { variant: "default", size: "lg" },
  className,
  isOpen,
  setIsOpen,
  title,
  description,
}: DialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      {isDesktop ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="flex h-min max-h-[90vh] max-w-min flex-col overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className={cn("grow", className)}>
              {children}
              {closeButton && (
                <DialogClose
                  className={cn(
                    "self-end justify-self-end",
                    buttonVariants(closeButtonVariant),
                  )}
                >
                  {closeButton}
                </DialogClose>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            {children}
            <DrawerFooter className="pt-2">
              {closeButton && (
                <DrawerClose
                  asChild
                  className={cn(
                    "self-end justify-self-end",
                    buttonVariants(closeButtonVariant),
                  )}
                >
                  {closeButton}
                </DrawerClose>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
