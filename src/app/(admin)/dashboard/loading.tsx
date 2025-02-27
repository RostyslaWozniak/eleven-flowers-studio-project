import { Loader } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="absolute inset-0 z-40 flex h-dvh items-center justify-center bg-background">
      <Loader size={50} className="animate-spin" />
    </div>
  );
}
