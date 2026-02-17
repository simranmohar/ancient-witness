import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "iiytr5i4", // This is your ID from earlier
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // False means we get fresh data instantly (good for dev)
});