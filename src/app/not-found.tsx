import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center gap-6">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground text-lg">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <div className="flex gap-4">
        <Button
          className="bg-vidext-500 hover:bg-vidext-500/70 text-primary"
          asChild
        >
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </main>
  );
}
