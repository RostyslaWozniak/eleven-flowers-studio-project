import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="0 z-50 flex min-h-screen w-full items-center justify-center bg-background">
      <Loader size={50} className="animate-spin" />
    </div>
  );
}
