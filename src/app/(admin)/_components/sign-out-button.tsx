import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export function SignOutButton() {
  const handleSignOut = async () => {
    redirect("/api/admin/auth/signout");
  };
  return (
    <Button
      size="lg"
      variant={"outline"}
      className="w-min"
      onClick={handleSignOut}
    >
      <LogOut />
      <span>Logout</span>
    </Button>
  );
}
