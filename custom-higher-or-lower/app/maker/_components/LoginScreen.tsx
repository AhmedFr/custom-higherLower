import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LoginScreen() {
  const router = useRouter();

  function goToLogin() {
    router.push("/login");
  }

  return (
    <div className="flex flex-col px-10 pt-20 items-center gap-8 min-h-screen">
      <h2 className="text-3xl lg:text-6xl font-bold">
        You must be logged in to create a category
      </h2>
      <p>Click the button below to login or register</p>
      <Button className="w-44" onClick={goToLogin}>
        Login
      </Button>
    </div>
  );
}
