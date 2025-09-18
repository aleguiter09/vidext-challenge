import { CreateButton } from "@/components/CreateButton";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center flex-1 text-center gap-6">
      <h1 className="text-3xl font-bold">
        Welcome to the{" "}
        <Link
          href="https://www.vidext.io/en"
          target="_blank"
          className="text-vidext-500 relative pb-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
        >
          Vidext
        </Link>{" "}
        Challenge 👋
      </h1>
      <p className="text-muted-foreground">
        Start by creating a new document or open one from the sidebar.
      </p>
      <CreateButton />
    </div>
  );
}
