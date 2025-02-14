import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export function SignOutButton() {
  const handleSignOut = async () => {
    redirect("/api/admin/auth/signout");
  };
  return (
    <Button size="lg" className="px-4" onClick={handleSignOut}>
      <LogOut className="" />
      <span>Log out</span>
    </Button>
  );
}
