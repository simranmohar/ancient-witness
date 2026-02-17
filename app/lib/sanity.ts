import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

if (!projectId || !dataset || !apiVersion) {
  throw new Error(
    "Missing Sanity configuration. Please check your environment variables."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // False means we get fresh data instantly but slower, true means we get catched data but might be 60 seconds old.
});