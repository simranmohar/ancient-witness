import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "8Ss5sZK8Doo", // This is your ID from earlier
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // False means we get fresh data instantly (good for dev)
});