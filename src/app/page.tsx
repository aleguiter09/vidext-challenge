import { CreateButton } from "@/components/CreateButton";

export default async function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center flex-1 text-center gap-6">
      <h1 className="text-3xl font-bold">Welcome 👋</h1>
      <p className="text-muted-foreground">
        Start by creating a new document or open one from the sidebar.
      </p>
      <CreateButton />
    </div>
  );
}
