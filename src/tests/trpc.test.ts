import { serverClient } from "@/server/serverClient";
import { type SerializedSchema } from "tldraw";
import { describe, it, expect } from "vitest";

describe("Document API", () => {
  it("should create, read and delete a document", async () => {
    const id = "test-doc-1";

    await serverClient.saveDocument({
      id,
      title: "Test Document",
      snapshot: {
        document: { store: {}, schema: {} as SerializedSchema },
        session: { version: 2 },
      },
    });

    const doc = await serverClient.getDocument({ id });
    expect(doc?.title).toBe("Test Document");

    const all = await serverClient.getAll();
    expect(all.find((d) => d.id === id)).toBeDefined();

    await serverClient.deleteDocument({ id });
    const afterDelete = await serverClient.getDocument({ id });
    expect(afterDelete.snapshot).toBeUndefined();
  });
});
